package ua.nure.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;
import ua.nure.entity.Medicine;
import ua.nure.entity.Placement;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
@ToString
public class MedicinesProvider extends User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "medicines_provider_id")
    private Long id;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @Column(name = "name")
    private String name;

    @JsonIgnore
    @Column(name = "creation_date")
    private Date creationDate;

    @Column(name = "country")
    private String country;

    @OneToMany(mappedBy = "medicinesProvider", fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<Placement> placements;

    @OneToMany(mappedBy = "medicinesProvider", fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<Medicine> medicines;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        MedicinesProvider that = (MedicinesProvider) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
