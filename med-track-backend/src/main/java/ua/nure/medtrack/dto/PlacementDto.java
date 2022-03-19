package ua.nure.medtrack.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class PlacementDto {

    private Long id;

    private String type;

    private SmartDeviceDto smartDevice;

}
