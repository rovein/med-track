package ua.nure.service;

import ua.nure.dto.medicine.MedicineStorageInfo;
import ua.nure.dto.medicine.MedicineStorageInfoDto;
import ua.nure.dto.medicine.MedicineStorageRequestDto;
import ua.nure.dto.medicine.MedicineStorageResponseDto;

import java.util.Set;

public interface MedicineStorageService {

    MedicineStorageResponseDto create(MedicineStorageRequestDto medicineStorageRequestDto);

    MedicineStorageResponseDto update(MedicineStorageRequestDto medicineStorageRequestDto);

    void delete(Long id);

    MedicineStorageResponseDto findById(Long id);

    Set<MedicineStorageInfoDto> getAllStoragesByPlacement(Long placementId);

    Set<MedicineStorageInfoDto> getAllStoragesByMedicine(Long medicineId);

    MedicineStorageInfo getStorageInfoByStorageId(Long storageId);

}
