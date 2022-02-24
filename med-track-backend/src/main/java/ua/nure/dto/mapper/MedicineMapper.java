package ua.nure.dto.mapper;

import ua.nure.dto.medicine.MedicineDto;
import ua.nure.entity.Medicine;

import java.util.Set;
import java.util.stream.Collectors;

public class MedicineMapper {

    public static MedicineDto toMedicineDto(Medicine medicine) {
        return new MedicineDto()
                .setId(medicine.getId())
                .setName(medicine.getName())
                .setPrice(medicine.getPrice())
                .setStorageForm(medicine.getStorageForm())
                .setShelfLife(medicine.getShelfLife())
                .setMinTemperature(medicine.getMinTemperature())
                .setMaxTemperature(medicine.getMaxTemperature())
                .setMaxHumidity(medicine.getMaxHumidity());
    }

    public static Set<MedicineDto> toMedicineDto(Set<Medicine> medicines) {
        return medicines.stream()
                .map(MedicineMapper::toMedicineDto).collect(Collectors.toSet());
    }

    public static Medicine toMedicine(MedicineDto medicineDto) {
        return new Medicine()
                .setId(medicineDto.getId() == null ? 0 : medicineDto.getId())
                .setName(medicineDto.getName())
                .setPrice(medicineDto.getPrice())
                .setStorageForm(medicineDto.getStorageForm())
                .setShelfLife(medicineDto.getShelfLife())
                .setMinTemperature(medicineDto.getMinTemperature())
                .setMaxTemperature(medicineDto.getMaxTemperature())
                .setMaxHumidity(medicineDto.getMaxHumidity());
    }

}
