package ua.nure.medtrack.dto.mapper;

import ua.nure.medtrack.dto.medicine.MedicineStorageResponseDto;
import ua.nure.medtrack.entity.MedicineStorage;

public class MedicineStorageMapper {

    public static MedicineStorageResponseDto toMedicineStorageResponseDto(MedicineStorage medicineStorage) {
        return new MedicineStorageResponseDto()
                .setId(medicineStorage.getId())
                .setStartDate(medicineStorage.getStartDate())
                .setAmount(medicineStorage.getAmount())
                .setMedicineId(medicineStorage.getMedicine().getId())
                .setPlacementId(medicineStorage.getPlacement().getId());
    }

}
