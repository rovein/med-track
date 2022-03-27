import React, {useEffect, useState} from 'react'
import {useTranslation, withTranslation} from 'react-i18next';

import axios from "../util/ApiUtil";
import MedicinesTable from "./medicine/MedicinesTable";
import WarehousesTable from "./warehouse/WarehousesTable";
import {MEDICINES, WAREHOUSES} from "../util/Constants";

function Profile() {
    if (localStorage.getItem("Token") == null) {
        window.location.href = './'
    }
    localStorage.removeItem("Id")

    const [provider, setProvider] = useState({})
    const [shownTable, setShownTable] = useState(localStorage.getItem("profileShownTable"))

    useEffect(() => {
        let cachedMedicinesProvider = localStorage.getItem("medicinesProvider");
        if (cachedMedicinesProvider != null) {
            setProvider(JSON.parse(cachedMedicinesProvider));
            return
        }
        axios.get(`/medicines-providers/${localStorage.getItem('UserEmail')}`)
            .then(result => {
                    setProvider(result.data);
                    localStorage.setItem("medicinesProvider", JSON.stringify(result.data));
                }
            )
    }, [])

    const buttonStyle = {padding: 0, height: '26px', fontSize: '18px'};

    const setTable = tableName => {
        localStorage.setItem("profileShownTable", tableName);
        setShownTable(tableName)
    }

    const getStyleClasses = tableName => {
        const baseStyle = "w3-btn w3-round-small";
        const colorStyle = shownTable === tableName ? " w3-teal" : " w3-khaki";
        return baseStyle + colorStyle;
    }

    const {t} = useTranslation();
    return (
        <div>
            <div className="w3-light-grey w3-text-black w3-border w3-border-black profile_back">
                <p id="cName">{provider.name}</p>
                <p></p>
                <p>{t("Email")}: {provider.email}</p>
                <button style={buttonStyle} className={getStyleClasses(WAREHOUSES)}
                        onClick={() => setTable(WAREHOUSES)}>{t("Warehouses")}</button>
                <p>{t("Phone")}: {provider.phoneNumber}</p>
                <button style={buttonStyle} className={getStyleClasses(MEDICINES)}
                        onClick={() => setTable(MEDICINES)}>{t("Medicines")}</button>
                <p>{t("FCountry")}: {provider.country}</p>
            </div>
            <div>
                {shownTable === WAREHOUSES && <WarehousesTable/>}
                {shownTable === MEDICINES && <MedicinesTable/>}
            </div>
        </div>
    )
}

export default withTranslation()(Profile);
