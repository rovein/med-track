package ua.nure.medtrack.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.nure.medtrack.dto.MedicinesProviderDto;
import ua.nure.medtrack.service.MedicinesProviderService;

@RestController
@CrossOrigin
@RequestMapping(path = "/admin")
@Api(tags = "8. Admin")
public class AdminController {

    private final MedicinesProviderService medicinesProviderService;

    @Autowired
    public AdminController(MedicinesProviderService medicinesProviderService) {
        this.medicinesProviderService = medicinesProviderService;
    }

    @PostMapping("/lock-user/{email}")
    @ApiOperation(value = "Locks/unlocks user access to the system", nickname = "lockUser")
    public ResponseEntity<?> lockUser(@PathVariable String email) {
        MedicinesProviderDto medicinesProviderDto = medicinesProviderService.findByEmail(email);
        boolean reverseLocked = !medicinesProviderDto.getLockStatus();
        medicinesProviderDto.setLockStatus(reverseLocked);
        return ResponseEntity.ok(medicinesProviderService.update(medicinesProviderDto));
    }

}
