package ua.nure.dto.mapper;

import ua.nure.dto.PlacementDto;
import ua.nure.dto.SmartDeviceDto;
import ua.nure.entity.Placement;
import ua.nure.entity.SmartDevice;

import java.util.Set;
import java.util.stream.Collectors;

public class PlacementMapper {

    public static PlacementDto toPlacementDto(Placement placement) {
        return new PlacementDto()
                .setId(placement.getId())
                .setType(placement.getType())
                .setSmartDevice(SmartDeviceMapper.toSmartDeviceDto(placement.getSmartDevice()));
    }

    public static Set<PlacementDto> toPlacementDto(Set<Placement> placements) {
        return placements.stream()
                .map(PlacementMapper::toPlacementDto).collect(Collectors.toSet());
    }

    public static Placement toPlacement(PlacementDto placementDto) {
        SmartDeviceDto smartDeviceDto = placementDto.getSmartDevice();
        SmartDevice smartDevice = (smartDeviceDto == null) ? null : SmartDeviceMapper.toSmartDevice(smartDeviceDto);
        return new Placement()
                .setId(placementDto.getId() == null ? 0 : placementDto.getId())
                .setType(placementDto.getType())
                .setSmartDevice(smartDevice);
    }

}
