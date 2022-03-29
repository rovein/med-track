package ua.nure.medtrack.dto.mapper;

import ua.nure.medtrack.dto.medicine.MedicineStorageInfo;
import ua.nure.medtrack.dto.medicine.MedicineStorageInfoDto;
import ua.nure.medtrack.dto.medicine.MedicineStorageResponseDto;
import ua.nure.medtrack.entity.MedicineStorage;

import java.util.Set;
import java.util.stream.Collectors;

public class MedicineStorageMapper {

    public static MedicineStorageResponseDto toMedicineStorageResponseDto(MedicineStorage medicineStorage) {
        return new MedicineStorageResponseDto()
                .setId(medicineStorage.getId())
                .setStartDate(medicineStorage.getStartDate())
                .setAmount(medicineStorage.getAmount())
                .setMedicineId(medicineStorage.getMedicine().getId())
                .setPlacementId(medicineStorage.getPlacement().getId());
    }

    public static Set<MedicineStorageInfoDto> toMedicineStorageInfoDto(Set<MedicineStorageInfo> storages) {
        return storages.stream()
                .map(MedicineStorageInfoDto::new)
                .collect(Collectors.toSet());
    }

}
