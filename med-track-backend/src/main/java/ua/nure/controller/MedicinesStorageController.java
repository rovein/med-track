package ua.nure.controller;

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
import ua.nure.dto.medicine.MedicineStorageInfoDto;
import ua.nure.dto.medicine.MedicineStorageRequestDto;
import ua.nure.service.MedicineStorageService;

import javax.validation.Valid;

import static ua.nure.validation.BindingResultValidator.errorBody;

@CrossOrigin
@RestController
@RequestMapping("/medicine-storages")
@Api(tags = "Medicine Storage")
public class MedicinesStorageController {

    private final MedicineStorageService medicineStorageService;

    @Autowired
    public MedicinesStorageController(MedicineStorageService medicineStorageService) {
        this.medicineStorageService = medicineStorageService;
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "Finds medicine storage by id", nickname = "getMedicineStorageById")
    public ResponseEntity<?> getMedicineStorageById(@PathVariable Long id) {
        return ResponseEntity.ok(medicineStorageService.findById(id));
    }

    @GetMapping("/placement/{id}")
    @ApiOperation(value = "Finds all storages for provided placement", nickname = "getAllMedicineStoragesByPlacement")
    public ResponseEntity<?> getAllMedicineStoragesByPlacement(@PathVariable Long id) {
        return ResponseEntity.ok(medicineStorageService.getAllStoragesByPlacement(id));
    }

    @GetMapping("/medicine/{id}")
    @ApiOperation(value = "Finds all storages for provided medicine", nickname = "getAllMedicineStoragesByMedicine")
    public ResponseEntity<?> getAllMedicineStoragesByMedicine(@PathVariable Long id) {
        return ResponseEntity.ok(medicineStorageService.getAllStoragesByMedicine(id));
    }

    @GetMapping("/info/{id}")
    @ApiOperation(value = "Finds medicine storage info by id", nickname = "getMedicineStorageInfoById")
    public ResponseEntity<?> getMedicineStorageInfoById(@PathVariable Long id) {
        return ResponseEntity.ok(new MedicineStorageInfoDto(medicineStorageService.getStorageInfoByStorageId(id)));
    }

    @PostMapping
    @ApiOperation(value = "Creates new medicine storage", nickname = "createMedicineStorage")
    public ResponseEntity<?> createMedicineStorage(@Valid @RequestBody MedicineStorageRequestDto medicineStorageRequestDto,
                                                   BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(errorBody(bindingResult));
        }
        return ResponseEntity.ok(medicineStorageService.create(medicineStorageRequestDto));
    }

    @PutMapping
    @ApiOperation(
            value = "Updates storage (Medicine Storage ID must be present, updates only amount)",
            nickname = "updateStorage"
    )
    public ResponseEntity<?> updateMedicineStorage(@Valid @RequestBody MedicineStorageRequestDto medicineStorageRequestDto,
                                                   BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(errorBody(bindingResult));
        }
        return ResponseEntity.ok(medicineStorageService.update(medicineStorageRequestDto));
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "Deletes medicine storage by ID", nickname = "deleteMedicineStorage")
    public ResponseEntity<Void> deleteMedicineStorage(@PathVariable Long id) {
        medicineStorageService.findById(id);
        medicineStorageService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
