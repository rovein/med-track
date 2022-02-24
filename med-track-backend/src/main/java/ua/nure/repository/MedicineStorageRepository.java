package ua.nure.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ua.nure.dto.medicine.MedicineStorageInfo;
import ua.nure.entity.MedicineStorage;

import java.util.Set;

@Repository
public interface MedicineStorageRepository extends CrudRepository<MedicineStorage, Long> {

    String baseStorageInfoQuery = "SELECT flower_storage.flower_storage_id as id, flower_storage.amount as amount, "
            + "flower_storage.start_date as startDate, flower.name as flowerName, "
            + "flower.color as flowerColor, flower.shelf_life as flowerShelfLife, flower.flower_id as flowerId, "
            + "flower_storage.storage_room_id as storageRoomId, flower.min_temperature as minTemperature, flower.max_temperature as maxTemperature, "
            + "room.city, room.street, room.house, room.max_capacity as maxCapacity, "
            + "s.temperature, s.humidity, s.satisfaction_factor as satisfactionFactor, s.air_quality as airQuality "
            + "FROM flower_storage "
            + "JOIN flower ON flower_storage.flower_id = flower.flower_id "
            + "JOIN storage_room room ON flower_storage.storage_room_id = room.storage_room_id "
            + "JOIN smart_system s ON room.storage_room_id = s.storage_room_id ";

    @Query(value = baseStorageInfoQuery + "WHERE room.storage_room_id = ?1", nativeQuery = true)
    Set<MedicineStorageInfo> getAllStoragesByPlacement(Long roomId);

    @Query(value = baseStorageInfoQuery + "WHERE flower.flower_id = ?1", nativeQuery = true)
    Set<MedicineStorageInfo> getAllStoragesByMedicine(Long medicineId);

    @Query(value = baseStorageInfoQuery + "WHERE flower_storage.flower_storage_id = ?1", nativeQuery = true)
    MedicineStorageInfo getStorageInfoByStorageId(Long storageId);

}
