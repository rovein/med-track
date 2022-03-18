package ua.nure.dto.medicine;

import java.util.Date;

public interface MedicineStorageInfo {

    Long getId();
    
    Integer getAmount();

    Date getStartDate();

    Long getMedicineId();

    String getMedicineName();

    String getMedicinePrice();

    String getMedicineStorageForm();

    String getMedicineShelfLife();

    Long getMinTemperature();

    Long getMaxTemperature();

    Long getMaxHumidity();

    Long getPlacementId();

    String getPlacementType();

    Long getWarehouseId();

    String getCity();

    String getStreet();

    String getHouse();

    Long getMaxCapacity();
    
    Double getTemperature();

    Double getHumidity();

}
