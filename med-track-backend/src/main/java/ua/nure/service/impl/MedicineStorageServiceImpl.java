package ua.nure.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.nure.dto.error.StorageCreationHumidityErrorDto;
import ua.nure.dto.error.StorageCreationTemperatureErrorDto;
import ua.nure.dto.medicine.MedicineStorageInfo;
import ua.nure.dto.medicine.MedicineStorageInfoDto;
import ua.nure.dto.medicine.MedicineStorageRequestDto;
import ua.nure.dto.medicine.MedicineStorageResponseDto;
import ua.nure.dto.mapper.MedicineStorageMapper;
import ua.nure.entity.Medicine;
import ua.nure.entity.MedicineStorage;
import ua.nure.entity.Placement;
import ua.nure.entity.SmartDevice;
import ua.nure.entity.Warehouse;
import ua.nure.entity.user.MedicinesProvider;
import ua.nure.exception.EntityNotFoundException;
import ua.nure.exception.MedicineStorageCreationException;
import ua.nure.repository.MedicineRepository;
import ua.nure.repository.MedicineStorageRepository;
import ua.nure.repository.PlacementRepository;
import ua.nure.service.MedicineStorageService;
import ua.nure.util.EmailUtil;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MedicineStorageServiceImpl implements MedicineStorageService {

    private final MedicineStorageRepository medicineStorageRepository;

    private final PlacementRepository placementRepository;

    private final MedicineRepository medicineRepository;

    private final ObjectMapper objectMapper;

    private final SimpleDateFormat dateFormat;

    private final SimpleDateFormat timeFormat;

    @Autowired
    public MedicineStorageServiceImpl(MedicineStorageRepository medicineStorageRepository,
                                      PlacementRepository placementRepository,
                                      MedicineRepository medicineRepository) {
        this.medicineStorageRepository = medicineStorageRepository;
        this.placementRepository = placementRepository;
        this.medicineRepository = medicineRepository;
        this.objectMapper = new ObjectMapper();
        this.dateFormat = new SimpleDateFormat("dd.MM.yyyy");
        this.timeFormat = new SimpleDateFormat("HH:mm");
    }

    @Override
    @Transactional
    public MedicineStorageResponseDto create(MedicineStorageRequestDto medicineStorageRequestDto) {
        MedicineStorage medicineStorage = new MedicineStorage();
        medicineStorage.setStartDate(new Date());

        Placement placement = placementRepository
                .findById(medicineStorageRequestDto.getPlacementId())
                .orElseThrow(() -> new EntityNotFoundException("Cannot find placement by ID"));
        Medicine medicine = medicineRepository
                .findById(medicineStorageRequestDto.getMedicineId())
                .orElseThrow(() -> new EntityNotFoundException("Cannot find medicine by ID"));

        medicineStorage.setPlacement(placement);
        medicineStorage.setMedicine(medicine);
        medicineStorage.setAmount(medicineStorageRequestDto.getAmount());

        SmartDevice smartDevice = placement.getSmartDevice();
        checkTemperature(smartDevice, medicine);
        checkHumidity(smartDevice, medicine);

        MedicineStorage createdMedicineStorage = medicineStorageRepository.save(medicineStorage);
        Warehouse warehouse = placement.getWarehouse();
        MedicinesProvider medicinesProvider = warehouse.getMedicinesProvider();
        sendEmailNotification(medicinesProvider, createdMedicineStorage, placement, medicine, warehouse);

        return MedicineStorageMapper.toMedicineStorageResponseDto(createdMedicineStorage);
    }

    @SneakyThrows
    private void checkTemperature(SmartDevice smartDevice, Medicine medicine) {
        Double actualTemperature = smartDevice.getTemperature();
        Integer minTemperature = medicine.getMinTemperature();
        Integer maxTemperature = medicine.getMaxTemperature();

        if (actualTemperature < minTemperature || actualTemperature > maxTemperature) {
            var error = new StorageCreationTemperatureErrorDto(actualTemperature, minTemperature, maxTemperature);
            throw new MedicineStorageCreationException(objectMapper.writeValueAsString(error));
        }
    }

    @SneakyThrows
    private void checkHumidity(SmartDevice smartDevice, Medicine medicine) {
        Double actualHumidity = smartDevice.getHumidity();
        Integer maxHumidity = medicine.getMaxHumidity();

        if (actualHumidity > maxHumidity) {
            var error = new StorageCreationHumidityErrorDto(actualHumidity, maxHumidity);
            throw new MedicineStorageCreationException(objectMapper.writeValueAsString(error));
        }
    }

    private void sendEmailNotification(MedicinesProvider medicinesProvider, MedicineStorage medicineStorage,
                                       Placement placement, Medicine medicine, Warehouse warehouse) {
        String content = EmailUtil.retrieveContentFromHtmlTemplate("email-templates/contract-created-message.html");
        Date creationDate = medicineStorage.getStartDate();
        new Thread(() -> EmailUtil.message()
                .destination(medicinesProvider.getEmail())
                .subject("Створено нове зберігання ліків")
                .body(String.format(content,
                        dateFormat.format(creationDate),
                        timeFormat.format(creationDate),
                        "№ " + placement.getId() + " - " + placement.getType(),
                        medicine.getName(),
                        medicineStorage.getAmount(),
                        medicinesProvider.getCountry(),
                        warehouse.getCity(),
                        warehouse.getStreet(),
                        warehouse.getHouse(),
                        medicine.getName(),
                        medicine.getPrice(),
                        medicine.getStorageForm(),
                        medicine.getShelfLife()
                ))
                .send()
        ).start();
    }

    @Override
    public MedicineStorageResponseDto update(MedicineStorageRequestDto medicineStorageRequestDto) {
        return medicineStorageRepository.findById(medicineStorageRequestDto.getId())
                .map(storage -> {
                    storage.setAmount(medicineStorageRequestDto.getAmount());
                    return MedicineStorageMapper.toMedicineStorageResponseDto(medicineStorageRepository.save(storage));
                })
                .orElseThrow(() -> new EntityNotFoundException("Cannot find medicine storage by ID"));
    }

    @Override
    public void delete(Long id) {
        medicineStorageRepository.deleteById(id);
    }

    @Override
    public MedicineStorageResponseDto findById(Long id) {
        return medicineStorageRepository.findById(id)
                .map(MedicineStorageMapper::toMedicineStorageResponseDto)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find medicine storage by ID"));
    }

    @Override
    public Set<MedicineStorageInfoDto> getAllStoragesByPlacement(Long placementId) {
        return placementRepository.findById(placementId)
                .map(placement ->
                        calculateAndSetActualCapacity(medicineStorageRepository.getAllStoragesByPlacement(placementId)))
                .orElse(Collections.emptySet());
    }

    @Override
    public Set<MedicineStorageInfoDto> getAllStoragesByMedicine(Long medicineId) {
        return medicineRepository.findById(medicineId)
                .map(medicine ->
                        calculateAndSetActualCapacity(medicineStorageRepository.getAllStoragesByMedicine(medicineId)))
                .orElse(Collections.emptySet());
    }

    private Set<MedicineStorageInfoDto> calculateAndSetActualCapacity(Set<MedicineStorageInfo> storages) {
        int actualCapacity = storages.stream().mapToInt(MedicineStorageInfo::getAmount).sum();
        return storages.stream()
                .map(MedicineStorageInfoDto::new)
                .map(infoDto -> infoDto.setActualCapacity(actualCapacity))
                .collect(Collectors.toSet());
    }

    @Override
    public MedicineStorageInfo getStorageInfoByStorageId(Long storageId) {
        return Optional.of(findById(storageId))
                .map(storage -> medicineStorageRepository.getStorageInfoByStorageId(storageId))
                .orElseThrow(() -> new EntityNotFoundException("Cannot find medicine storage by ID"));
    }

}
