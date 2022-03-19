package ua.nure.medtrack.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ua.nure.medtrack.entity.Placement;

@Repository
public interface PlacementRepository extends CrudRepository<Placement, Long> {

}
