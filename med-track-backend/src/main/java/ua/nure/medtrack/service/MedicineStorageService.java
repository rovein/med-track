package ua.nure.medtrack.service;

import ua.nure.medtrack.dto.medicine.MedicineStorageInfo;
import ua.nure.medtrack.dto.medicine.MedicineStorageInfoDto;
import ua.nure.medtrack.dto.medicine.MedicineStorageRequestDto;
import ua.nure.medtrack.dto.medicine.MedicineStorageResponseDto;

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
