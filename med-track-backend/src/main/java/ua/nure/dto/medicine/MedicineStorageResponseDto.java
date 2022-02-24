package ua.nure.dto.medicine;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Date;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class MedicineStorageResponseDto {

    private Long id;

    private Date startDate;

    private Integer amount;

    private Long placementId;

    private Long medicineId;
}
