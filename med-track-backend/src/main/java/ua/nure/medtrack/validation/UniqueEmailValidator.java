package ua.nure.medtrack.validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.nure.medtrack.repository.MedicinesProviderRepository;
import ua.nure.medtrack.validation.annotation.UniqueEmail;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

    @Autowired
    private MedicinesProviderRepository medicinesProviderRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        return medicinesProviderRepository.findByEmail(value).isEmpty();
    }
}
