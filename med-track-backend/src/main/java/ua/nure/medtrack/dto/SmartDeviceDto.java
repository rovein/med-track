package ua.nure.medtrack.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
public class SmartDeviceDto {

    private Long id;

    private double temperature;

    private double humidity;

}
