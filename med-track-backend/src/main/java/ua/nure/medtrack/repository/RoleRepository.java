package ua.nure.medtrack.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import ua.nure.medtrack.entity.role.Role;
import ua.nure.medtrack.entity.role.UserRole;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {

    Optional<Role> findByName(UserRole name);

    @NonNull  List<Role> findAll();

}
