package ua.nure.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import ua.nure.entity.role.UserRole;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class MedicinesProviderDto {

    private Long id;

    @NotEmpty(message = "Phone number can`t be empty")
    private String phoneNumber;

    @NotEmpty(message = "Email can`t be empty")
    @Email(message = "Invalid email")
    protected String email;

    protected String password;

    @NotEmpty(message = "Name can`t be empty")
    private String name;

    private Date creationDate;

    private UserRole role;

    private Boolean isLocked;

    private String country;

    public MedicinesProviderDto isLocked(boolean isLocked) {
        this.isLocked = isLocked;
        return this;
    }

    public Boolean isLocked() {
        return isLocked;
    }

}
