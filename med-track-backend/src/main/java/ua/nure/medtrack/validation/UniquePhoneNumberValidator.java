package ua.nure.medtrack.validation;

import org.springframework.beans.factory.annotation.Autowired;
import ua.nure.medtrack.repository.MedicinesProviderRepository;
import ua.nure.medtrack.validation.annotation.UniquePhoneNumber;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniquePhoneNumberValidator implements ConstraintValidator<UniquePhoneNumber, String> {

    @Autowired
    private MedicinesProviderRepository medicinesProviderRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        return medicinesProviderRepository.findByPhoneNumber(value).isEmpty();
    }
}
