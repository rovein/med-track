package ua.nure.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import ua.nure.entity.user.MedicinesProvider;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicinesProviderRepository extends CrudRepository<MedicinesProvider, Long> {

    Optional<MedicinesProvider> findByPhoneNumber(String phoneNumber);

    Optional<MedicinesProvider> findByEmail(String email);

    @NonNull List<MedicinesProvider> findAll();

}
