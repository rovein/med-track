package ua.nure.medtrack.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class WarehouseDto {

    private Long id;

    private String city;

    private String street;

    private String house;

}
