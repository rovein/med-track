package ua.nure.service.impl;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ua.nure.dto.medicine.MedicineDto;
import ua.nure.dto.PlacementDto;
import ua.nure.dto.MedicinesProviderDto;
import ua.nure.dto.SmartDeviceDto;
import ua.nure.dto.mapper.MedicineMapper;
import ua.nure.dto.mapper.PlacementMapper;
import ua.nure.dto.mapper.MedicinesProviderMapper;
import ua.nure.entity.Medicine;
import ua.nure.entity.Placement;
import ua.nure.entity.user.MedicinesProvider;
import ua.nure.entity.SmartDevice;
import ua.nure.exception.EntityNotFoundException;
import ua.nure.repository.MedicineRepository;
import ua.nure.repository.MedicinesProviderRepository;
import ua.nure.repository.PlacementRepository;
import ua.nure.service.MedicinesProviderService;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import static ua.nure.dto.mapper.MedicinesProviderMapper.toMedicinesProvider;
import static ua.nure.dto.mapper.MedicinesProviderMapper.toMedicinesProviderDto;

@Service
@Log4j2
public class MedicinesProviderServiceImpl implements MedicinesProviderService {

    private final MedicinesProviderRepository medicinesProviderRepository;

    private final PlacementRepository placementRepository;

    private final MedicineRepository medicineRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public MedicinesProviderServiceImpl(
            MedicinesProviderRepository medicinesProviderRepository,
            PlacementRepository placementRepository,
            MedicineRepository medicineRepository,
            BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.medicinesProviderRepository = medicinesProviderRepository;
        this.placementRepository = placementRepository;
        this.medicineRepository = medicineRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public MedicinesProviderDto create(MedicinesProviderDto medicinesProviderDto) {
        MedicinesProvider medicinesProvider =
                toMedicinesProvider(medicinesProviderDto, new MedicinesProvider(), bCryptPasswordEncoder);
        return toMedicinesProviderDto(medicinesProviderRepository.save(medicinesProvider));
    }

    @Override
    public MedicinesProviderDto update(MedicinesProviderDto medicinesProviderDto) {
        return medicinesProviderRepository.findByEmail(medicinesProviderDto.getEmail())
                .map(owner -> {
                    MedicinesProvider medicinesProvider =
                            toMedicinesProvider(medicinesProviderDto, owner, bCryptPasswordEncoder);
                    return toMedicinesProviderDto(medicinesProviderRepository.save(medicinesProvider));
                }).orElseThrow(() -> new EntityNotFoundException("Cannot find medicine provider"));
    }

    @Override
    public void delete(MedicinesProviderDto medicinesProviderDto) {
        medicinesProviderRepository.deleteById(medicinesProviderDto.getId());
    }

    @Override
    public List<MedicinesProviderDto> findAll() {
        List<MedicinesProvider> medicinesProviders = medicinesProviderRepository.findAll();
        return MedicinesProviderMapper.toMedicinesProviderDto(medicinesProviders);
    }

    @Override
    public MedicinesProviderDto findByPhoneNumber(String phoneNumber) {
        return medicinesProviderRepository.findByPhoneNumber(phoneNumber)
                .map(MedicinesProviderMapper::toMedicinesProviderDto)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find medicine provider by phone number"));
    }

    @Override
    public MedicinesProviderDto findByEmail(String email) {
        return medicinesProviderRepository.findByEmail(email)
                .map(MedicinesProviderMapper::toMedicinesProviderDto)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find medicine provider by email"));
    }

    @Override
    public MedicinesProviderDto findById(Long id) {
        return medicinesProviderRepository.findById(id)
                .map(MedicinesProviderMapper::toMedicinesProviderDto)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find medicine provider by ID"));
    }

    @Override
    public Set<PlacementDto> findAllPlacements(String email) {
        return medicinesProviderRepository.findByEmail(email)
                .map(provider -> PlacementMapper.toPlacementDto(provider.getPlacements()))
                .orElse(Collections.emptySet());
    }

    @Override
    public PlacementDto addPlacement(PlacementDto placementDto, String email) {
        return savePlacement(placementDto,
                medicinesProviderRepository.findByEmail(email)
                        .orElseThrow(() -> new EntityNotFoundException("Cannot find provider by email"))
        );
    }

    @Override
    public PlacementDto updatePlacement(PlacementDto placementDto, String email) {
        return medicinesProviderRepository.findByEmail(email)
                .map(provider -> {
                    placementRepository.findById(placementDto.getId())
                            .orElseThrow(() -> new EntityNotFoundException("Cannot find placement by ID"));
                    return provider;
                })
                .map(provider -> savePlacement(placementDto, provider))
                .orElseThrow(() -> new EntityNotFoundException("Cannot find provider by email"));
    }

    @Override
    public void deletePlacement(PlacementDto placementDto) {
        placementRepository.deleteById(placementDto.getId());
    }

    @Override
    public PlacementDto findPlacementById(Long id) {
        return placementRepository.findById(id)
                .map(PlacementMapper::toPlacementDto)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find placement by ID"));
    }

    @Override
    public PlacementDto updateSmartDevice(SmartDeviceDto smartDeviceDto) {
        return placementRepository
                .findById(smartDeviceDto.getId())
                .map(placement -> {
                    SmartDevice smartDevice = placement.getSmartDevice();
                    smartDevice
                            .setTemperature(round(smartDeviceDto.getTemperature()))
                            .setHumidity(round(smartDeviceDto.getHumidity()));
                    placement.setSmartDevice(smartDevice);
                    log.info("Updated Smart Device {}", smartDevice);
                    return PlacementMapper.toPlacementDto(placementRepository.save(placement));
                }).orElseThrow(() -> new EntityNotFoundException("Cannot find placement by Smart Device ID"));
    }

    private PlacementDto savePlacement(PlacementDto placementDto, MedicinesProvider owner) {
        Placement placement = PlacementMapper.toPlacement(placementDto);
        SmartDevice smartDevice = placement.getSmartDevice();

        if (smartDevice == null) {
            smartDevice = new SmartDevice();
        }

        smartDevice.setPlacement(placement);
        smartDevice.setId(placement.getId());
        setDeviceIndicators(smartDevice);
        placement.setSmartDevice(smartDevice);

        placement.setMedicinesProvider(owner);
        return PlacementMapper.toPlacementDto(placementRepository.save(placement));
    }

    private void setDeviceIndicators(SmartDevice smartDevice) {
        if (smartDevice.getHumidity() == null) {
            smartDevice.setHumidity(0.0);
        }
        if (smartDevice.getTemperature() == null) {
            smartDevice.setTemperature(0.0);
        }
    }

    private double round(double value) {
        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(2, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

    @Override
    public Set<MedicineDto> findAllMedicines(String email) {
        return medicinesProviderRepository.findByEmail(email)
                .map(provider -> MedicineMapper.toMedicineDto(provider.getMedicines()))
                .orElse(Collections.emptySet());
    }

    @Override
    public MedicineDto addMedicine(MedicineDto medicineDto, String email) {
        return saveMedicine(medicineDto,
                medicinesProviderRepository.findByEmail(email)
                        .orElseThrow(() -> new EntityNotFoundException("Cannot find provider by email"))
        );
    }

    @Override
    public MedicineDto updateMedicine(MedicineDto medicineDto, String email) {
        return medicinesProviderRepository.findByEmail(email)
                .map(provider -> {
                    medicineRepository.findById(medicineDto.getId())
                            .orElseThrow(() -> new EntityNotFoundException("Cannot find medicine by ID"));
                    return provider;
                })
                .map(provider -> saveMedicine(medicineDto, provider))
                .orElseThrow(() -> new EntityNotFoundException("Cannot find provider by email"));
    }

    @Override
    public void deleteMedicine(MedicineDto medicineDto) {
        medicineRepository.deleteById(medicineDto.getId());
    }

    @Override
    public MedicineDto findMedicineById(Long id) {
        return medicineRepository.findById(id)
                .map(MedicineMapper::toMedicineDto)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find medicine by ID"));
    }

    private MedicineDto saveMedicine(MedicineDto medicineDto, MedicinesProvider owner) {
        Medicine medicine = MedicineMapper.toMedicine(medicineDto);
        medicine.setMedicinesProvider(owner);
        return MedicineMapper.toMedicineDto(medicineRepository.save(medicine));
    }

}
