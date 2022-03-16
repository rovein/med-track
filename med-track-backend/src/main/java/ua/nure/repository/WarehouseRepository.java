package ua.nure.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ua.nure.entity.Warehouse;

@Repository
public interface WarehouseRepository extends CrudRepository<Warehouse, Long> {

}
