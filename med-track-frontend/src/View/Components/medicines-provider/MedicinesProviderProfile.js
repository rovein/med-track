import React, {useEffect, useState} from 'react'
import {useTranslation, withTranslation} from 'react-i18next';

import axios from "../util/ApiUtil";
import MedicinesTable from "./medicine/MedicinesTable";
import WarehousesTable from "./warehouse/WarehousesTable";
import {MEDICINES, WAREHOUSES} from "../util/Constants";
import {
    checkToken,
    getCurrentMedicinesProvider,
    getProfileShownTable,
    getCurrentUserEmail,
    setCurrentMedicinesProvider, setProfileShownTable
} from "../util/LocalStorageUtils";

function Profile() {
    checkToken();

    const [provider, setProvider] = useState({})
    const [shownTable, setShownTable] = useState(getProfileShownTable())

    const checkCachedMedicinesProvider = () => {
        const cachedMedicinesProvider = getCurrentMedicinesProvider();
        if (cachedMedicinesProvider != null) {
            setProvider(cachedMedicinesProvider);
            return true
        }
        return false
    }

    useEffect(() => {
        if (checkCachedMedicinesProvider()) return;
        axios.get(`/medicines-providers/${getCurrentUserEmail()}`).then(result => {
                setProvider(result.data);
                setCurrentMedicinesProvider(result.data);
            }
        )
    }, [])

    const buttonStyle = {padding: 0, height: '26px', fontSize: '18px'};

    const setTable = tableName => {
        setProfileShownTable(tableName);
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
                <p className={'entityName'}>{provider.name}</p>
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
