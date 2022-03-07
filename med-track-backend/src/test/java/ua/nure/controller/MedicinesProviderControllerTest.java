package ua.nure.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.filter.OncePerRequestFilter;
import ua.nure.dto.MedicinesProviderDto;
import ua.nure.service.MedicinesProviderService;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = MedicinesProviderController.class,
        excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE,
                value = {WebSecurityConfigurer.class, OncePerRequestFilter.class})},
        excludeAutoConfiguration = {SecurityAutoConfiguration.class})
public class MedicinesProviderControllerTest {

    private final List<MedicinesProviderDto> medicinesProviders = List.of(
            new MedicinesProviderDto().setId(1L), new MedicinesProviderDto().setId(2L)
    );

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MedicinesProviderService medicinesProviderService;

    @Test
    @WithMockUser("admin@gmail.com")
    public void getAllMedicinesProvidersTest() throws Exception {
        when(medicinesProviderService.findAll()).thenReturn(medicinesProviders);

        mockMvc.perform(get("/medicine-providers"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("[{}, {}]"))
                .andExpect(jsonPath("$[0]['id']", is(1)))
                .andExpect(jsonPath("$[1]['id']", is(2)));
    }

}
