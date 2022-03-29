import {withTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {
    getCurrentWarehouse,
    getCurrentMedicinesProvider,
    getCurrentPlacement,
    getCurrentMedicine
} from "../../util/LocalStorageUtils";
import {useParams} from "react-router-dom";
import StoragesByPlacementInfoBlock from "./by-placement/StoragesByPlacementInfoBlock";
import StoragesByMedicineInfoBlock from "./by-medicine/StoragesByMedicinetInfoBlock";
import StoragesByPlacementTable from "./by-placement/StoragesByPlacementTable";
import StoragesByMedicineTable from "./by-medicine/StoragesByMedicineTable";

function MedicineStorageInfo() {
    const { getBy, id } = useParams();
    const [warehouse, setWarehouse] = useState({})
    const [placement, setPlacement] = useState({})
    const [provider, setProvider] = useState({})
    const [medicine, setMedicine] = useState({})

    const isStoragesByPlacement = () => {
        return getBy === 'by-placement';
    }

    const isStoragesByMedicines = () => {
        return getBy === 'by-medicine';
    }

    useEffect(() => {
        if (isStoragesByPlacement()) {
            setWarehouse(getCurrentWarehouse())
            setPlacement(getCurrentPlacement())
        } else if (isStoragesByMedicines()) {
            setProvider(getCurrentMedicinesProvider())
            setMedicine(getCurrentMedicine())
        }
    }, [])

    return (
        <div>
            {isStoragesByPlacement() && <StoragesByPlacementInfoBlock placement={placement} warehouse={warehouse}/>}
            {isStoragesByMedicines() && <StoragesByMedicineInfoBlock provider={provider} medicine={medicine}/>}
            <div>
                {isStoragesByPlacement() && <StoragesByPlacementTable id={id}/>}
                {isStoragesByMedicines() && <StoragesByMedicineTable id={id}/>}
            </div>
        </div>
    )
}

export default withTranslation()(MedicineStorageInfo)
