package ua.nure.medtrack.dto.medicine;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class MedicineStorageInfoDto {

    public MedicineStorageInfoDto(MedicineStorageInfo medicineStorageInfo) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");

        this.setId(medicineStorageInfo.getId())
                .setStartDate(medicineStorageInfo.getStartDate())
                .setAmount(medicineStorageInfo.getAmount())
                .setMedicineId(medicineStorageInfo.getMedicineId())
                .setMedicineName(medicineStorageInfo.getMedicineName())
                .setMedicinePrice(medicineStorageInfo.getMedicinePrice())
                .setMedicineStorageForm(medicineStorageInfo.getMedicineStorageForm())
                .setMedicineShelfLife(medicineStorageInfo.getMedicineShelfLife())
                .setMinTemperature(medicineStorageInfo.getMinTemperature())
                .setMaxTemperature(medicineStorageInfo.getMaxTemperature())
                .setMaxHumidity(medicineStorageInfo.getMaxHumidity())
                .setPlacementId(medicineStorageInfo.getPlacementId())
                .setPlacementType(medicineStorageInfo.getPlacementType())
                .setWarehouseId(medicineStorageInfo.getWarehouseId())
                .setCity(medicineStorageInfo.getCity())
                .setStreet(medicineStorageInfo.getStreet())
                .setHouse(medicineStorageInfo.getHouse())
                .setTemperature(medicineStorageInfo.getTemperature())
                .setHumidity(medicineStorageInfo.getHumidity())
                .setFormattedDate(formatter.format(medicineStorageInfo.getStartDate()));
    }

    private Long id;

    private Date startDate;

    private Integer amount;

    private Long medicineId;

    private String medicineName;

    private String medicinePrice;

    private String medicineStorageForm;

    private String medicineShelfLife;

    private Long minTemperature;

    private Long maxTemperature;

    private Long maxHumidity;

    private Long placementId;

    private String placementType;

    private Long warehouseId;

    private String city;

    private String street;

    private String house;

    private Double temperature;

    private Double humidity;

    private Integer actualCapacity;

    private String formattedDate;

}
