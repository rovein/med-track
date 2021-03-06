package ua.nure.medtrack.repository;

import org.springframework.data.repository.CrudRepository;
import ua.nure.medtrack.entity.user.Admin;

import java.util.Optional;

public interface AdminRepository extends CrudRepository<Admin, Long> {

    Optional<Admin> findByEmail(String email);

}
