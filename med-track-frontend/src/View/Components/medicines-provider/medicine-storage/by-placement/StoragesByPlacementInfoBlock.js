import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import axios from "../../../util/ApiUtil";
import {formatPlacementData} from "../../../util/DataFormattingUtil";

function StoragesByPlacementInfoBlock({warehouse, placement, id}) {
    const {t} = useTranslation();
    const [placementRoom, setPlacement] = useState(placement)
    useEffect(() => {
        axios.get(`/medicines-providers/warehouses/placements/${id}`)
            .then(result => setPlacement(formatPlacementData(result.data)))
    })
    return <div className="w3-light-grey w3-text-black w3-border w3-border-black profile_back">
        <p className={'entityName'}>{t("Warehouse") + ' № ' + warehouse.id}</p>
        <p className={'entityName'}>{t("Placement") + ' № ' + placement.id}</p>
        <p>{t("FCity")}: {warehouse.city}</p>
        <p>{t("FPlacementType")}: {placementRoom.type}</p>
        <p>{t("FStreet")}: {warehouse.street}</p>
        <p>{t("Temp")}: {placementRoom.temperature}</p>
        <p>{t("FHouse")}: {warehouse.house}</p>
        <p>{t("Hum")}: {placementRoom.humidity}</p>
    </div>
}

export default StoragesByPlacementInfoBlock;
