package ua.nure.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ua.nure.entity.Medicine;

@Repository
public interface MedicineRepository extends CrudRepository<Medicine, Long> {

}
