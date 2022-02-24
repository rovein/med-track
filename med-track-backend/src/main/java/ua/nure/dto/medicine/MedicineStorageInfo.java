package ua.nure.dto.medicine;

import java.util.Date;

public interface MedicineStorageInfo {

    public Long getId();

    public Date getStartDate();

    public Integer getAmount();

    public String getFlowerName();

    public String getFlowerColor();

    public String getFlowerShelfLife();

    public Long getFlowerId();

    public Long getStorageRoomId();

    public Long getMinTemperature();

    public Long getMaxTemperature();

    public String getCity();

    public String getStreet();

    public String getHouse();

    public Long getMaxCapacity();

    public Integer getActualCapacity();

    public Double getTemperature();

    public Double getHumidity();

    public Double getSatisfactionFactor();

    public Double getAirQuality();

}
