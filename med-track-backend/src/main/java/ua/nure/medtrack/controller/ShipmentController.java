package ua.nure.medtrack.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.nure.medtrack.service.MedicinesProviderService;

@CrossOrigin
@RestController
@RequestMapping("/shipments")
@Api(tags = "7. Shipments")
public class ShipmentController {

    private final MedicinesProviderService medicinesProviderService;

    @Autowired
    public ShipmentController(MedicinesProviderService medicinesProviderService) {
        this.medicinesProviderService = medicinesProviderService;
    }

    @GetMapping()
    @ApiOperation(value = "Returns a list of all shipments by warehouse", nickname = "getAllShipmentsByWarehouse")
    public ResponseEntity<Long> getAllShipmentsByWarehouse(@RequestParam("warehouseId") Long warehouseId) {
        return ResponseEntity.ok(warehouseId);
    }

}
