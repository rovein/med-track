package ua.nure.medtrack.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.nure.medtrack.dto.MedicinesProviderDto;
import ua.nure.medtrack.service.MedicinesProviderService;

import javax.validation.Valid;
import java.util.List;

import static ua.nure.medtrack.validation.BindingResultValidator.errorBody;

@CrossOrigin
@RestController
@RequestMapping("/medicines-providers")
@Api(tags = "1. Medicines Provider")
public class MedicinesProviderController {

    private final MedicinesProviderService medicinesProviderService;

    @Autowired
    public MedicinesProviderController(MedicinesProviderService medicinesProviderService) {
        this.medicinesProviderService = medicinesProviderService;
    }

    @GetMapping
    @ApiOperation(value = "Returns a list of all medicines providers", nickname = "getAllMedicinesProviders")
    public ResponseEntity<List<MedicinesProviderDto>> getAllMedicinesProviders() {
        return ResponseEntity.ok(medicinesProviderService.findAll());
    }

    @GetMapping("/{email}")
    @ApiOperation(value = "Finds medicines provider by email", nickname = "getMedicinesProviderByEmail")
    public ResponseEntity<?> getMedicinesProviderByEmail(@PathVariable String email) {
        return ResponseEntity.ok(medicinesProviderService.findByEmail(email));
    }

    @PostMapping
    @ApiOperation(value = "Adds new medicines provider", nickname = "addMedicinesProvider")
    public ResponseEntity<?> addMedicinesProvider(@Valid @RequestBody MedicinesProviderDto medicinesProviderDto,
                                                  BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(errorBody(bindingResult));
        }
        return ResponseEntity.ok(medicinesProviderService.create(medicinesProviderDto));
    }

    @PutMapping
    @ApiOperation(value = "Updates the medicines provider", nickname = "updateMedicinesProvider")
    public ResponseEntity<?> updateMedicinesProvider(@Valid @RequestBody MedicinesProviderDto medicinesProviderDto,
                                                     BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(errorBody(bindingResult));
        }

        MedicinesProviderDto owner = medicinesProviderService.findByEmail(medicinesProviderDto.getEmail());

        String password = medicinesProviderDto.getPassword();
        if (password == null || password.isEmpty()) {
            medicinesProviderDto.setPassword(owner.getPassword());
        }

        return ResponseEntity.ok(medicinesProviderService.update(medicinesProviderDto));
    }

    @DeleteMapping("/{email}")
    @ApiOperation(value = "Deletes medicines provider by email", nickname = "deleteMedicinesProvider")
    public ResponseEntity<Void> deleteMedicinesProvider(@PathVariable String email) {
        medicinesProviderService.delete(medicinesProviderService.findByEmail(email));
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
