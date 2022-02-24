package ua.nure.dto.mapper;

import ua.nure.dto.SmartDeviceDto;
import ua.nure.entity.SmartDevice;

public class SmartDeviceMapper {

    public static SmartDeviceDto toSmartDeviceDto(SmartDevice smartDevice) {

        if (smartDevice == null) {
            return new SmartDeviceDto();
        }

        return new SmartDeviceDto()
                .setId(smartDevice.getId())
                .setTemperature(smartDevice.getTemperature())
                .setHumidity(smartDevice.getHumidity());
    }

    public static SmartDevice toSmartDevice(SmartDeviceDto smartDeviceDto) {
        SmartDevice smartDevice = new SmartDevice();
        if (smartDeviceDto == null) {
            return smartDevice;
        }

        return smartDevice
                .setTemperature(smartDeviceDto.getTemperature())
                .setHumidity(smartDeviceDto.getHumidity());
    }

}
