package ua.nure.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.nure.dto.SmartDeviceDto;
import ua.nure.service.MedicinesProviderService;

@CrossOrigin
@RestController
@RequestMapping("/device")
@Api(tags = "Smart Device")
public class SmartDeviceController {

    private final MedicinesProviderService medicinesProviderService;

    @Autowired
    public SmartDeviceController(MedicinesProviderService medicinesProviderService) {
        this.medicinesProviderService = medicinesProviderService;
    }

    @PostMapping()
    @ApiOperation(value = "Update smart device characteristics, endpoint for Arduino", nickname = "updateSmartDevice")
    public ResponseEntity<?> updateSmartDevice(@RequestBody SmartDeviceDto smartDeviceDto) {
        medicinesProviderService.findPlacementById(smartDeviceDto.getId());
        return ResponseEntity.ok(medicinesProviderService.updateSmartDevice(smartDeviceDto));
    }

}
