package ua.nure.service;

import ua.nure.dto.WarehouseDto;
import ua.nure.dto.medicine.MedicineDto;
import ua.nure.dto.PlacementDto;
import ua.nure.dto.MedicinesProviderDto;
import ua.nure.dto.SmartDeviceDto;

import java.util.List;
import java.util.Set;

public interface MedicinesProviderService {

    MedicinesProviderDto create(MedicinesProviderDto medicinesProviderDto);

    MedicinesProviderDto update(MedicinesProviderDto medicinesProviderDto);

    void delete(MedicinesProviderDto medicinesProviderDto);

    List<MedicinesProviderDto> findAll();

    MedicinesProviderDto findByPhoneNumber(String phoneNumber);

    MedicinesProviderDto findByEmail(String email);

    MedicinesProviderDto findById(Long id);

    Set<WarehouseDto> findAllWarehouses(String email);

    WarehouseDto addWarehouse(WarehouseDto warehouseDto, String email);

    WarehouseDto updateWarehouse(WarehouseDto warehouseDto, String email);

    WarehouseDto findWarehouseById(Long id);

    void deleteWarehouse(WarehouseDto warehouseDto);

    Set<PlacementDto> findAllPlacements(Long warehouseId);

    PlacementDto addPlacement(PlacementDto placementDto, Long warehouseId);

    PlacementDto updatePlacement(PlacementDto placementDto, Long warehouseId);

    PlacementDto findPlacementById(Long id);

    void deletePlacement(PlacementDto placementDto);

    PlacementDto updateSmartDevice(SmartDeviceDto smartDeviceDto);

    Set<MedicineDto> findAllMedicines(String email);

    MedicineDto addMedicine(MedicineDto medicineDto, String email);

    MedicineDto updateMedicine(MedicineDto medicineDto, String email);

    MedicineDto findMedicineById(Long id);

    void deleteMedicine(MedicineDto medicineDto);

}
