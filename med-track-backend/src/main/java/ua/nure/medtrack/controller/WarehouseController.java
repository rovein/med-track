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
import ua.nure.medtrack.dto.WarehouseDto;
import ua.nure.medtrack.service.MedicinesProviderService;

import javax.validation.Valid;

import static ua.nure.medtrack.validation.BindingResultValidator.errorBody;

@CrossOrigin
@RestController
@RequestMapping("/medicines-providers")
@Api(tags = "2. Warehouse")
public class WarehouseController {

    private final MedicinesProviderService medicinesProviderService;

    @Autowired
    public WarehouseController(MedicinesProviderService medicinesProviderService) {
        this.medicinesProviderService = medicinesProviderService;
    }

    @GetMapping("/{email}/warehouses")
    @ApiOperation(value = "Returns all warehouses", nickname = "getAllWarehouses")
    public ResponseEntity<?> getAllWarehouses(@PathVariable String email) {
        return ResponseEntity.ok(medicinesProviderService.findAllWarehouses(email));
    }

    @PostMapping("/{email}/warehouses")
    @ApiOperation(value = "Adds new warehouse for owner", nickname = "addWarehouse")
    public ResponseEntity<?> addWarehouse(@PathVariable String email,
                                          @Valid @RequestBody WarehouseDto warehouseDto,
                                          BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(errorBody(bindingResult));
        }
        return ResponseEntity.ok(medicinesProviderService.addWarehouse(warehouseDto, email));
    }

    @PutMapping("/{email}/warehouses")
    @ApiOperation(value = "Updates warehouse (warehouse id must be present)", nickname = "updateWarehouse")
    public ResponseEntity<?> updateWarehouse(@PathVariable String email,
                                             @Valid @RequestBody WarehouseDto warehouseDto,
                                             BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(errorBody(bindingResult));
        }
        return ResponseEntity.ok(medicinesProviderService.updateWarehouse(warehouseDto, email));
    }

    @DeleteMapping("/warehouses/{id}")
    @ApiOperation(value = "Deletes warehouse by ID", nickname = "deleteWarehouse")
    public ResponseEntity<Void> deleteWarehouse(@PathVariable Long id) {
        medicinesProviderService.deleteWarehouse(medicinesProviderService.findWarehouseById(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/warehouses/{id}")
    @ApiOperation(value = "Finds warehouse by id", nickname = "getWarehouseById")
    public ResponseEntity<?> getWarehouseById(@PathVariable Long id) {
        return ResponseEntity.ok(medicinesProviderService.findWarehouseById(id));
    }

}
