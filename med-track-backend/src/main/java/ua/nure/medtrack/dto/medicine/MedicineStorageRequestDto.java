package ua.nure.medtrack.dto.medicine;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class MedicineStorageRequestDto {

    private Long id;

    private Integer amount;

    private Long placementId;

    private Long medicineId;

}
