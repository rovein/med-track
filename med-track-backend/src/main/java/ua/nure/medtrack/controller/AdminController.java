package ua.nure.medtrack.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.nure.medtrack.dto.MedicinesProviderDto;
import ua.nure.medtrack.service.AdminService;
import ua.nure.medtrack.service.MedicinesProviderService;
import ua.nure.medtrack.util.PathsUtil;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;

@RestController
@CrossOrigin
@RequestMapping(path = "/admin")
@Api(tags = "8. Admin")
@Log4j2
public class AdminController {

    private final MedicinesProviderService medicinesProviderService;
    private final AdminService adminService;

    @Autowired
    public AdminController(MedicinesProviderService medicinesProviderService, AdminService adminService) {
        this.medicinesProviderService = medicinesProviderService;
        this.adminService = adminService;
    }

    @PostMapping("/lock-user/{email}")
    @ApiOperation(value = "Locks/unlocks user access to the system", nickname = "lockUser")
    public ResponseEntity<?> lockUser(@PathVariable String email) {
        MedicinesProviderDto medicinesProviderDto = medicinesProviderService.findByEmail(email);
        boolean reverseLocked = !medicinesProviderDto.getLockStatus();
        medicinesProviderDto.setLockStatus(reverseLocked);
        return ResponseEntity.ok(medicinesProviderService.update(medicinesProviderDto));
    }

    @GetMapping("/backup")
    @ApiOperation(value = "Performs data backup and returns .sql dump file", nickname = "getBackupData")
    public ResponseEntity<?> getBackupData() throws IOException {
        adminService.createBackupData();

        Path filePath = PathsUtil.getResourcePath("backup/backup_data.sql");
        File file = new File(filePath.toString());

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=backup_data.sql");
        header.add("Cache-Control", "no-cache, no-store, must-revalidate");
        header.add("Pragma", "no-cache");
        header.add("Expires", "0");

        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        return ResponseEntity.ok()
                .headers(header)
                .contentLength(file.length())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(resource);
    }

}
