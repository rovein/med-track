package ua.nure.medtrack.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.hibernate.Hibernate;
import ua.nure.medtrack.entity.user.MedicinesProvider;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "medicine")
@Getter
@Setter
@ToString
@Accessors(chain = true)
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "medicine_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "storage_form")
    private String storageForm;

    @Column(name = "shelf_life")
    private Date shelfLife;

    @Column(name = "min_temperature")
    private Integer minTemperature;

    @Column(name = "max_temperature")
    private Integer maxTemperature;

    @Column(name = "max_humidity")
    private Integer maxHumidity;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicines_provider_id")
    @ToString.Exclude
    protected MedicinesProvider medicinesProvider;

    @JsonIgnore
    @OneToMany(mappedBy = "medicine", fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<MedicineStorage> medicineStorages;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Medicine medicine = (Medicine) o;
        return id != null && Objects.equals(id, medicine.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
