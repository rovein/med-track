package ua.nure.medtrack.validation;

import org.springframework.validation.BindingResult;

import java.util.HashMap;
import java.util.Map;

public class BindingResultValidator {

    public static Map<String, String> errorBody(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();

        bindingResult.getFieldErrors()
                .forEach(fieldError ->
                        errors.put(
                                fieldError.getField(),
                                fieldError.getDefaultMessage())
                );

        bindingResult.getGlobalErrors()
                .forEach(globalError ->
                        errors.put(
                                globalError.getCode(),
                                globalError.getDefaultMessage())
                );

        return errors;
    }
}
