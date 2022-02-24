package ua.nure.dto.mapper;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import ua.nure.dto.MedicinesProviderDto;
import ua.nure.entity.user.MedicinesProvider;
import ua.nure.entity.role.Role;
import ua.nure.entity.role.UserRole;

import java.util.List;
import java.util.stream.Collectors;

public class MedicinesProviderMapper {

    public static MedicinesProviderDto toMedicinesProviderDto(MedicinesProvider medicinesProvider) {
        return new MedicinesProviderDto()
                .setId(medicinesProvider.getId())
                .setEmail(medicinesProvider.getEmail())
                .setPhoneNumber(medicinesProvider.getPhoneNumber())
                .setName(medicinesProvider.getName())
                .setCreationDate(medicinesProvider.getCreationDate())
                .isLocked(medicinesProvider.isLocked())
                .setRole(UserRole.MEDICINES_PROVIDER);
    }

    public static List<MedicinesProviderDto> toMedicinesProviderDto(List<MedicinesProvider> medicinesProvider) {
        return medicinesProvider.stream()
                .map(MedicinesProviderMapper::toMedicinesProviderDto).collect(Collectors.toList());
    }

    public static MedicinesProvider toMedicinesProvider(MedicinesProviderDto medicinesProviderDto,
                                                        MedicinesProvider medicinesProvider, BCryptPasswordEncoder encoder) {
        medicinesProvider.setEmail(medicinesProviderDto.getEmail());
        medicinesProvider.setPhoneNumber(medicinesProviderDto.getPhoneNumber());
        medicinesProvider.setName(medicinesProviderDto.getName());
        medicinesProvider.setCreationDate(medicinesProviderDto.getCreationDate());
        medicinesProvider.setRole(Role.from(UserRole.MEDICINES_PROVIDER));

        String password = medicinesProviderDto.getPassword();
        if (password.length() == 60) {
            medicinesProvider.setPassword(password);
        } else {
            medicinesProvider.setPassword(encoder.encode(password));
        }

        medicinesProvider.isLocked(medicinesProviderDto.isLocked() != null && medicinesProviderDto.isLocked());
        return medicinesProvider;
    }

}
