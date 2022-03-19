package ua.nure.medtrack.service;

import ua.nure.medtrack.entity.role.Role;
import ua.nure.medtrack.entity.role.UserRole;

import java.util.List;

public interface RoleService {

    Role findById(Long id);

    Role findByName(UserRole name);

    List<Role> findAll();

}
