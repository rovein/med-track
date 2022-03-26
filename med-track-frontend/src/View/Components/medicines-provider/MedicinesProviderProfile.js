import React, {useEffect, useState} from 'react'
import {useTranslation, withTranslation} from 'react-i18next';

import axios from "../util/ApiUtil";
import MedicinesTable from "./medicine/MedicinesTable";
import WarehousesTable from "./warehouse/WarehousesTable";

function Profile() {

    const [provider, setProvider] = useState({})
    const [shownTable, setShownTable] = useState("WAREHOUSES")

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

    localStorage.removeItem("Id")
    if (localStorage.getItem("Token") == null) {
        window.location.href = './'
    }
    const {t} = useTranslation();
    return (
        <div>
            <div className="w3-light-grey w3-text-black w3-border w3-border-black profile_back">
                <p id="cName">{provider.name}</p>
                <p></p>
                <p>{t("Email")}: {provider.email}</p>
                <button style={{padding: 0, height: '26px', fontSize: '18px'}}
                        className={shownTable === "WAREHOUSES" ? "w3-teal w3-btn w3-round-small" : "w3-khaki w3-btn w3-round-small"}
                        onClick={() => setShownTable("WAREHOUSES")}>{t("Warehouses")}</button>
                <p>{t("Phone")}: {provider.phoneNumber}</p>
                <button style={{padding: 0, height: '26px', fontSize: '18px'}}
                        className={shownTable === "MEDICINES" ? "w3-teal w3-btn w3-round-small" : "w3-khaki w3-btn w3-round-small"}
                        onClick={() => setShownTable("MEDICINES")}>{t("Medicines")}</button>
                <p>{t("FCountry")}: {provider.country}</p>
            </div>
            <div id="rooms_container">
                {shownTable === 'WAREHOUSES' && <WarehousesTable/>}
                {shownTable === 'MEDICINES' && <MedicinesTable/>}
            </div>
        </div>
    )
}

export default withTranslation()(Profile);
