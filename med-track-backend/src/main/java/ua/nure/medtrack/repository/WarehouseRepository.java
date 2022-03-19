package ua.nure.medtrack.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ua.nure.medtrack.entity.Warehouse;

@Repository
public interface WarehouseRepository extends CrudRepository<Warehouse, Long> {

}
