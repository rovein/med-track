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
import ua.nure.medtrack.dto.medicine.MedicineDto;
import ua.nure.medtrack.service.MedicinesProviderService;

import javax.validation.Valid;
import java.util.Set;

import static ua.nure.medtrack.validation.BindingResultValidator.errorBody;

@CrossOrigin
@RestController
@RequestMapping("/medicines-providers")
@Api(tags = "Medicines")
public class MedicinesController {

    private final MedicinesProviderService medicinesProviderService;

    @Autowired
    public MedicinesController(MedicinesProviderService medicinesProviderService) {
        this.medicinesProviderService = medicinesProviderService;
    }

    @GetMapping("/{email}/medicines")
    @ApiOperation(value = "Returns a list of all medicines", nickname = "getAllMedicines")
    public ResponseEntity<Set<MedicineDto>> getAllMedicines(@PathVariable String email) {
        medicinesProviderService.findByEmail(email);
        return ResponseEntity.ok(medicinesProviderService.findAllMedicines(email));
    }

    @PostMapping("/{email}/medicines")
    @ApiOperation(value = "Adds new medicine", nickname = "addMedicine")
    public ResponseEntity<?> addMedicine(@PathVariable String email,
                                         @Valid @RequestBody MedicineDto medicineDto,
                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(errorBody(bindingResult));
        }
        return ResponseEntity.ok(medicinesProviderService.addMedicine(medicineDto, email));
    }

    @PutMapping("/{email}/medicines")
    @ApiOperation(value = "Updates the Medicine", nickname = "updateMedicine")
    public ResponseEntity<?> updateMedicine(@PathVariable String email,
                                            @Valid @RequestBody MedicineDto medicineDto,
                                            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(errorBody(bindingResult));
        }
        return ResponseEntity.ok(medicinesProviderService.updateMedicine(medicineDto, email));
    }

    @DeleteMapping("/medicines/{id}")
    @ApiOperation(value = "Deletes Medicine by ID", nickname = "deleteMedicine")
    public ResponseEntity<Void> deleteMedicine(@PathVariable Long id) {
        medicinesProviderService.deleteMedicine(medicinesProviderService.findMedicineById(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/medicines/{id}")
    @ApiOperation(value = "Finds Medicine by ID", nickname = "getMedicineById")
    public ResponseEntity<?> getMedicineById(@PathVariable Long id) {
        return ResponseEntity.ok(medicinesProviderService.findMedicineById(id));
    }

}
