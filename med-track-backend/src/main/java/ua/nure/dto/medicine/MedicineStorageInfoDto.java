package ua.nure.dto.medicine;

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
                .setFlowerName(medicineStorageInfo.getFlowerName())
                .setFlowerColor(medicineStorageInfo.getFlowerColor())
                .setFlowerShelfLife(medicineStorageInfo.getFlowerShelfLife())
                .setFlowerId(medicineStorageInfo.getFlowerId())
                .setStorageRoomId(medicineStorageInfo.getStorageRoomId())
                .setMinTemperature(medicineStorageInfo.getMinTemperature())
                .setMaxTemperature(medicineStorageInfo.getMaxTemperature())
                .setCity(medicineStorageInfo.getCity())
                .setStreet(medicineStorageInfo.getStreet())
                .setHouse(medicineStorageInfo.getHouse())
                .setMaxCapacity(medicineStorageInfo.getMaxCapacity())
                .setTemperature(medicineStorageInfo.getTemperature())
                .setHumidity(medicineStorageInfo.getHumidity())
                .setAirQuality(medicineStorageInfo.getAirQuality())
                .setSatisfactionFactor(medicineStorageInfo.getSatisfactionFactor())
                .setFormattedDate(formatter.format(medicineStorageInfo.getStartDate()));
    }

    private Long id;

    private Date startDate;

    private Integer amount;

    private String flowerName;

    private String flowerColor;

    private String flowerShelfLife;

    private Long flowerId;

    private Long storageRoomId;

    private String formattedDate;

    private Long minTemperature;

    private Long maxTemperature;

    private String city;

    private String street;

    private String house;

    private Long maxCapacity;

    private Double temperature;

    private Double humidity;

    private Integer actualCapacity;

    public Double airQuality;

    public Double satisfactionFactor;

}
