package ua.nure.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ua.nure.dto.medicine.MedicineStorageInfo;
import ua.nure.entity.MedicineStorage;

import java.util.Set;

@Repository
public interface MedicineStorageRepository extends CrudRepository<MedicineStorage, Long> {

    String baseStorageInfoQuery = "SELECT mc.medicine_storage_id as id, mc.amount, "
            + "mc.start_date as startDate, medicine.medicine_id as medicineId, medicine.name as medicineName, "
            + "medicine.price as medicinePrice, medicine.storage_form as medicineStorageForm, "
            + "medicine.shelf_life as medicineShelfLife, medicine.min_temperature as minTemperature, "
            + "medicine.max_temperature as maxTemperature, medicine.max_humidity as maxHumidity, "
            + "mc.placement_id as placementId, placement.type as placementType, warehouse.id as warehouseId, "
            + "warehouse.city, warehouse.street, warehouse.house, sd.temperature, sd.humidity "
            + "FROM medicine_storage mc "
            + "JOIN medicine ON mc.medicine_id = medicine.medicine_id "
            + "JOIN placement placement ON mc.placement_id = placement.placement_id "
            + "JOIN warehouse warehouse ON placement.warehouse_id = warehouse.warehouse_id"
            + "JOIN smart_device sd ON placement.placement_id = s.placement_id ";

    @Query(value = baseStorageInfoQuery + "WHERE warehouse.warehouse_id = ?1", nativeQuery = true)
    Set<MedicineStorageInfo> getAllStoragesByWarehouse(Long warehouseId);

    @Query(value = baseStorageInfoQuery + "WHERE placement.placement_id = ?1", nativeQuery = true)
    Set<MedicineStorageInfo> getAllStoragesByPlacement(Long placementId);

    @Query(value = baseStorageInfoQuery + "WHERE medicine.medicine_id = ?1", nativeQuery = true)
    Set<MedicineStorageInfo> getAllStoragesByMedicine(Long medicineId);

    @Query(value = baseStorageInfoQuery + "WHERE mc.medicine_storage_id = ?1", nativeQuery = true)
    MedicineStorageInfo getStorageInfoByStorageId(Long storageId);

}
