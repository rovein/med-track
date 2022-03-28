package ua.nure.medtrack.dto.mapper;

import ua.nure.medtrack.dto.PlacementDto;
import ua.nure.medtrack.dto.SmartDeviceDto;
import ua.nure.medtrack.entity.Placement;
import ua.nure.medtrack.entity.SmartDevice;

import java.util.Set;
import java.util.stream.Collectors;

public class PlacementMapper {

    public static PlacementDto toPlacementDto(Placement placement) {
        return new PlacementDto()
                .setId(placement.getId())
                .setType(placement.getType())
                .setActualAmount(placement.getActualAmount())
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
