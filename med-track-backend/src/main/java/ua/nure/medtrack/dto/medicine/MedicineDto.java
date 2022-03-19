package ua.nure.medtrack.dto.medicine;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Date;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class MedicineDto {

    private Long id;

    private String name;

    private Double price;

    private String storageForm;

    private Date shelfLife;

    private Integer minTemperature;

    private Integer maxTemperature;

    private Integer maxHumidity;

}
