package ua.nure.medtrack.dto.mapper;

import ua.nure.medtrack.dto.WarehouseDto;
import ua.nure.medtrack.entity.Warehouse;

import java.util.Set;
import java.util.stream.Collectors;

public class WarehouseMapper {

    public static WarehouseDto toWarehouseDto(Warehouse warehouse) {
        return new WarehouseDto()
                .setId(warehouse.getId())
                .setCity(warehouse.getCity())
                .setStreet(warehouse.getCity())
                .setHouse(warehouse.getHouse());
    }

    public static Set<WarehouseDto> toWarehouseDto(Set<Warehouse> warehouses) {
        return warehouses.stream().map(WarehouseMapper::toWarehouseDto).collect(Collectors.toSet());
    }

    public static Warehouse toWarehouse(WarehouseDto warehouseDto) {
        return new Warehouse()
                .setId(warehouseDto.getId() == null ? 0 : warehouseDto.getId())
                .setCity(warehouseDto.getCity())
                .setStreet(warehouseDto.getStreet())
                .setHouse(warehouseDto.getHouse());
    }

}
