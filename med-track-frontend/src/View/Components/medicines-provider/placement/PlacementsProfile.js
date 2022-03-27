import {useTranslation, withTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import PlacementsTable from "./PlacementsTable";

function PlacementsProfile() {
    const [provider, setProvider] = useState({})
    const [warehouse, setWarehouse] = useState({})

    useEffect(() => {
        setProvider(JSON.parse(localStorage.getItem("medicinesProvider")));
        setWarehouse(JSON.parse(localStorage.getItem("currentWarehouse")))
    }, [])

    const {t} = useTranslation();
    return (
        <div>
            <div className="w3-light-grey w3-text-black w3-border w3-border-black profile_back">
                <p className={'entityName'}>{provider.name}</p>
                <p className={'entityName'}>{t("Warehouse") + ' № ' + warehouse.id}</p>
                <p>{t("Email")}: {provider.email}</p>
                <p>{t("FCity")}: {warehouse.city}</p>
                <p>{t("Phone")}: {provider.phoneNumber}</p>
                <p>{t("FStreet")}: {warehouse.street}</p>
                <p>{t("FCountry")}: {provider.country}</p>
                <p>{t("FHouse")}: {warehouse.house}</p>
            </div>
            <div>
                <PlacementsTable/>
            </div>
        </div>
    )
}

export default withTranslation()(PlacementsProfile)
