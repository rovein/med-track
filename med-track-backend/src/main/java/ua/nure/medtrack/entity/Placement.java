package ua.nure.medtrack.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.hibernate.Hibernate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "placement")
@Getter
@Setter
@Accessors(chain = true)
public class Placement {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "placement_id")
    private Long id;

    @Column(name = "type")
    private String type;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "warehouse_id")
    protected Warehouse warehouse;

    @OneToOne(mappedBy = "placement", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private SmartDevice smartDevice;

    @JsonIgnore
    @OneToMany(mappedBy = "placement", fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<MedicineStorage> medicineStorages;

    public int getActualAmount() {
        if (medicineStorages == null || medicineStorages.isEmpty()) {
            return 0;
        }
        return medicineStorages.stream().mapToInt(MedicineStorage::getAmount).sum();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Placement placement = (Placement) o;
        return id != null && Objects.equals(id, placement.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
