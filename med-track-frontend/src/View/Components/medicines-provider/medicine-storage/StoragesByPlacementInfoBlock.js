import React from "react";
import {useTranslation} from "react-i18next";

function StoragesByPlacementInfoBlock({warehouse, placement}) {
    const {t} = useTranslation();
    return <div className="w3-light-grey w3-text-black w3-border w3-border-black profile_back">
        <p className={'entityName'}>{t("Warehouse") + ' № ' + warehouse.id}</p>
        <p className={'entityName'}>{t("Placement") + ' № ' + placement.id}</p>
        <p>{t("FCity")}: {warehouse.city}</p>
        <p>{t("FPlacementType")}: {placement.type}</p>
        <p>{t("FStreet")}: {warehouse.street}</p>
        <p>{t("Temp")}: {placement.temperature}</p>
        <p>{t("FHouse")}: {warehouse.house}</p>
        <p>{t("Hum")}: {placement.humidity}</p>
    </div>
}

export default StoragesByPlacementInfoBlock;
