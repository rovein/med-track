package ua.nure.medtrack.dto.medicine;

import lombok.Data;
import ua.nure.medtrack.entity.Medicine;
import ua.nure.medtrack.entity.Placement;

import java.util.List;

@Data
public class PossibleMoveLocations {

    private final Medicine medicine;

    private final List<Placement> possibleMovePlacements;

}
