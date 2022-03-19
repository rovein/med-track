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
import ua.nure.medtrack.dto.medicine.MedicineDto;
import ua.nure.medtrack.dto.PlacementDto;
import ua.nure.medtrack.dto.MedicinesProviderDto;
import ua.nure.medtrack.service.MedicinesProviderService;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

import static ua.nure.medtrack.validation.BindingResultValidator.errorBody;

@CrossOrigin
@RestController
@RequestMapping("/medicine-providers")
@Api(tags = "MedicinesProvider")
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

    @GetMapping("/warehouses/{id}/placements")
    @ApiOperation(value = "Returns all placements", nickname = "getAllPlacements")
    public ResponseEntity<?> getAllPlacements(@PathVariable Long id) {
        return ResponseEntity.ok(medicinesProviderService.findAllPlacements(id));
    }

    @PostMapping("/warehouses/{id}/placements")
    @ApiOperation(value = "Adds new placement for owner", nickname = "addPlacement")
    public ResponseEntity<?> addPlacement(@PathVariable Long id,
                                          @Valid @RequestBody PlacementDto placementDto,
                                          BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(errorBody(bindingResult));
        }
        return ResponseEntity.ok(medicinesProviderService.addPlacement(placementDto, id));
    }

    @PutMapping("/warehouses/{id}/placements")
    @ApiOperation(value = "Updates medicines provider (placement id must be present)", nickname = "updatePlacement")
    public ResponseEntity<?> updatePlacement(@PathVariable Long id,
                                             @Valid @RequestBody PlacementDto placementDto,
                                             BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(errorBody(bindingResult));
        }
        return ResponseEntity.ok(medicinesProviderService.updatePlacement(placementDto, id));
    }

    @DeleteMapping("/warehouses/placements/{id}")
    @ApiOperation(value = "Deletes placement by ID", nickname = "deletePlacement")
    public ResponseEntity<Void> deletePlacement(@PathVariable Long id) {
        medicinesProviderService.deletePlacement(medicinesProviderService.findPlacementById(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/warehouses/placements/{id}")
    @ApiOperation(value = "Finds placement by id", nickname = "getPlacementById")
    public ResponseEntity<?> getPlacementById(@PathVariable Long id) {
        return ResponseEntity.ok(medicinesProviderService.findPlacementById(id));
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
