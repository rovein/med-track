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
import ua.nure.medtrack.dto.PlacementDto;
import ua.nure.medtrack.service.MedicinesProviderService;

import javax.validation.Valid;

import static ua.nure.medtrack.validation.BindingResultValidator.errorBody;

@CrossOrigin
@RestController
@RequestMapping("/medicines-providers/warehouses")
@Api(tags = "3. Placement")
public class PlacementController {

    private final MedicinesProviderService medicinesProviderService;

    @Autowired
    public PlacementController(MedicinesProviderService medicinesProviderService) {
        this.medicinesProviderService = medicinesProviderService;
    }

    @GetMapping("/{id}/placements")
    @ApiOperation(value = "Returns all placements", nickname = "getAllPlacements")
    public ResponseEntity<?> getAllPlacements(@PathVariable Long id) {
        return ResponseEntity.ok(medicinesProviderService.findAllPlacements(id));
    }

    @PostMapping("/{id}/placements")
    @ApiOperation(value = "Adds new placement for owner", nickname = "addPlacement")
    public ResponseEntity<?> addPlacement(@PathVariable Long id,
                                          @Valid @RequestBody PlacementDto placementDto,
                                          BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(errorBody(bindingResult));
        }
        return ResponseEntity.ok(medicinesProviderService.addPlacement(placementDto, id));
    }

    @PutMapping("/{id}/placements")
    @ApiOperation(value = "Updates medicines provider (placement id must be present)", nickname = "updatePlacement")
    public ResponseEntity<?> updatePlacement(@PathVariable Long id,
                                             @Valid @RequestBody PlacementDto placementDto,
                                             BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(errorBody(bindingResult));
        }
        return ResponseEntity.ok(medicinesProviderService.updatePlacement(placementDto, id));
    }

    @DeleteMapping("/placements/{id}")
    @ApiOperation(value = "Deletes placement by ID", nickname = "deletePlacement")
    public ResponseEntity<Void> deletePlacement(@PathVariable Long id) {
        medicinesProviderService.deletePlacement(medicinesProviderService.findPlacementById(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/placements/{id}")
    @ApiOperation(value = "Finds placement by id", nickname = "getPlacementById")
    public ResponseEntity<?> getPlacementById(@PathVariable Long id) {
        return ResponseEntity.ok(medicinesProviderService.findPlacementById(id));
    }

}
