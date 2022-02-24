package ua.nure.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ua.nure.entity.user.MedicinesProvider;
import ua.nure.entity.user.Admin;
import ua.nure.repository.AdminRepository;
import ua.nure.repository.MedicinesProviderRepository;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MedicinesProviderRepository medicinesProviderRepository;

    private final AdminRepository adminRepository;

    @Autowired
    public UserDetailsServiceImpl(
            MedicinesProviderRepository medicinesProviderRepository,
            AdminRepository adminRepository
    ) {
        this.medicinesProviderRepository = medicinesProviderRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<MedicinesProvider> medicinesProvider = medicinesProviderRepository.findByEmail(email);
        Optional<Admin> admin = adminRepository.findByEmail(email);

        return medicinesProvider.map(UserDetailsImpl::new)
                .orElse(admin.map(UserDetailsImpl::new)
                        .orElseThrow(() ->
                                new UsernameNotFoundException("User with email " + email + " not found")));
    }

}
