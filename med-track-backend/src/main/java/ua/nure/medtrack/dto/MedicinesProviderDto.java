package ua.nure.medtrack.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import ua.nure.medtrack.entity.role.UserRole;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class MedicinesProviderDto {

    @ApiModelProperty(hidden = true)
    private Long id;

    @NotEmpty(message = "Phone number can`t be empty")
    private String phoneNumber;

    @NotEmpty(message = "Email can`t be empty")
    @Email(message = "Invalid email")
    protected String email;

    protected String password;

    @NotEmpty(message = "Name can`t be empty")
    private String name;

    @ApiModelProperty(hidden = true)
    private Date creationDate;

    @ApiModelProperty(hidden = true)
    private UserRole role;

    @ApiModelProperty(hidden = true)
    private Boolean isLocked;

    private String country;

    public MedicinesProviderDto setLockStatus(boolean isLocked) {
        this.isLocked = isLocked;
        return this;
    }

    @ApiModelProperty(hidden = true)
    public Boolean getLockStatus() {
        return isLocked;
    }

}
