package ua.nure.medtrack.dto.medicine;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.text.SimpleDateFormat;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class MedicineStorageInfoDto {

    public MedicineStorageInfoDto(MedicineStorageInfo medicineStorageInfo) {
        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm dd.MM.yyyy");

        this.setId(medicineStorageInfo.getId())
                .setStartDate(formatter.format(medicineStorageInfo.getStartDate()))
                .setAmount(medicineStorageInfo.getAmount())
                .setMedicineId(medicineStorageInfo.getMedicineId())
                .setName(medicineStorageInfo.getMedicineName())
                .setPrice(medicineStorageInfo.getMedicinePrice())
                .setStorageForm(medicineStorageInfo.getMedicineStorageForm())
                .setShelfLife(medicineStorageInfo.getMedicineShelfLife())
                .setMinTemperature(medicineStorageInfo.getMinTemperature())
                .setMaxTemperature(medicineStorageInfo.getMaxTemperature())
                .setMaxHumidity(medicineStorageInfo.getMaxHumidity())
                .setPlacementId(medicineStorageInfo.getPlacementId())
                .setType(medicineStorageInfo.getPlacementType())
                .setWarehouseId(medicineStorageInfo.getWarehouseId())
                .setCity(medicineStorageInfo.getCity())
                .setStreet(medicineStorageInfo.getStreet())
                .setHouse(medicineStorageInfo.getHouse())
                .setTemperature(medicineStorageInfo.getTemperature())
                .setHumidity(medicineStorageInfo.getHumidity());
    }

    private Long id;

    private String startDate;

    private Integer amount;

    private Long medicineId;

    private String name;

    private String price;

    private String storageForm;

    private String shelfLife;

    private Long minTemperature;

    private Long maxTemperature;

    private Long maxHumidity;

    private Long placementId;

    private String type;

    private Long warehouseId;

    private String city;

    private String street;

    private String house;

    private Double temperature;

    private Double humidity;

}
