package ua.nure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.web.filter.OncePerRequestFilter;
import ua.nure.dto.MedicinesProviderDto;
import ua.nure.exception.EntityNotFoundException;
import ua.nure.service.MedicinesProviderService;

import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.is;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = MedicinesProviderController.class,
        excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE,
                value = {WebSecurityConfigurer.class, OncePerRequestFilter.class})},
        excludeAutoConfiguration = {SecurityAutoConfiguration.class})
public class MedicinesProviderControllerTest {

    private final MedicinesProviderDto provider = new MedicinesProviderDto().setId(1L).setPhoneNumber("test")
            .setEmail("test@gmail.com").setName("test");
    private final List<MedicinesProviderDto> medicinesProviders = List.of(
            provider, new MedicinesProviderDto().setId(2L)
    );

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MedicinesProviderService medicinesProviderService;

    @Test
    public void testGetAllMedicinesProviders() throws Exception {
        when(medicinesProviderService.findAll()).thenReturn(medicinesProviders);

        mockMvc.perform(get("/medicine-providers"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("[{}, {}]"))
                .andExpect(jsonPath("$[0]['id']", is(1)))
                .andExpect(jsonPath("$[1]['id']", is(2)));
    }

    @Test
    public void testGetAllMedicinesProvidersIfEmpty() throws Exception {
        when(medicinesProviderService.findAll()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/medicine-providers"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("[]"));
    }

    @Test
    public void testGetMedicinesProviderByEmail() throws Exception {
        when(medicinesProviderService.findByEmail(anyString())).thenReturn(medicinesProviders.get(0));

        mockMvc.perform(get("/medicine-providers/test@gmail.com"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("{}"))
                .andExpect(jsonPath("$.id", is(1)));
    }

    @Test
    public void testGetMedicinesProviderByEmailIfNotFound() throws Exception {
        doThrow(EntityNotFoundException.class).when(medicinesProviderService).findByEmail(anyString());
        mockMvc.perform(get("/medicine-providers/test@gmail.com")).andExpect(status().isNotFound());
    }

    @Test
    public void testAddMedicineProvider() throws Exception {
        when(medicinesProviderService.create(any())).thenReturn(provider);
        verifyCreateOrUpdateAction(post("/medicine-providers"));
    }

    @Test
    public void testAddMedicineProviderValidationFailure() throws Exception {
        verifyFailureCreateOrUpdateAction(post("/medicine-providers"));
    }

    @Test
    public void testUpdateMedicineProvider() throws Exception {
        when(medicinesProviderService.findByEmail(anyString())).thenReturn(provider);
        when(medicinesProviderService.update(any())).thenReturn(provider);
        verifyCreateOrUpdateAction(put("/medicine-providers"));
    }

    @Test
    public void testUpdateMedicineProviderValidationFailure() throws Exception {
        verifyFailureCreateOrUpdateAction(put("/medicine-providers"));
    }

    @Test
    public void testDeleteMedicineProvider() throws Exception {
        when(medicinesProviderService.findByEmail(anyString())).thenReturn(provider);
        doNothing().when(medicinesProviderService).delete(provider);
        mockMvc.perform(delete("/medicine-providers/test@gmail.com")).andExpect(status().isOk());
    }

    @Test
    public void testDeleteMedicineProviderWhenEmailIsNotFound() throws Exception {
        doThrow(EntityNotFoundException.class).when(medicinesProviderService).findByEmail(anyString());
        mockMvc.perform(delete("/medicine-providers/test@gmail.com")).andExpect(status().isNoContent());
    }

    private void verifyCreateOrUpdateAction(MockHttpServletRequestBuilder requestBuilder) throws Exception {
        mockMvc.perform(requestBuilder
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(provider)))
                .andExpect(status().isOk())
                .andExpect(content().json("{}"))
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.phoneNumber", is("test")))
                .andExpect(jsonPath("$.email", is("test@gmail.com")))
                .andExpect(jsonPath("$.name", is("test")));
    }

    private void verifyFailureCreateOrUpdateAction(MockHttpServletRequestBuilder requestBuilder) throws Exception {
        MedicinesProviderDto invalidProvider = new MedicinesProviderDto().setEmail("invalid");
        mockMvc.perform(requestBuilder
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidProvider)))
                .andExpect(status().isBadRequest())
                .andExpect(content().json("{}"))
                .andExpect(jsonPath("$.phoneNumber", is("Phone number can`t be empty")))
                .andExpect(jsonPath("$.name", is("Name can`t be empty")))
                .andExpect(jsonPath("$.email", is("Invalid email")));
    }

}
