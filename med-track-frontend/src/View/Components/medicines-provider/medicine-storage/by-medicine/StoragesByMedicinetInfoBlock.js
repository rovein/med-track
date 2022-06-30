import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Moment from "moment";
import axios from "../../../util/ApiUtil";
import {formatMedicineData} from "../../../util/DataFormattingUtil";

function StoragesByMedicineInfoBlock({provider, medicineCached, id}) {
    const getShelfLifeStyle = () => {
        return Moment(medicine.shelfLife).isBefore(Moment.now()) ? {color: "red"} : {color: "#009688"}
    }
    const {t} = useTranslation();
    const [medicine, setMedicine] = useState(medicineCached)
    useEffect(() => {
        axios.get(`/medicines-providers/medicines/${id}`)
            .then(result => setMedicine(formatMedicineData(result.data)))
    })
    return <div className="w3-light-grey w3-text-black w3-border w3-border-black profile_back">
        <p className={'entityName'}>{provider.name}</p>
        <p className={'entityName'}>{medicine.name && medicine.price ? medicine.name + ' (' + medicine.storageForm + ') ' + ' - ' + medicine.price : ""}</p>

        <p>{t("Email")}: {provider.email}</p>
        <p>{t('FMedicineShelfLife')}: <span style={getShelfLifeStyle()}>{medicine.shelfLife}</span></p>

        <p>{t("Phone")}: {provider.phoneNumber}</p>
        <p>{t("StorageConditions")}: {t("FMaxHumidityDetailed")} {medicine.maxHumidity}</p>

        <p>{t("FCountry")}: {provider.country}</p>
        <p>{t("Temperature")} {t("From")} {medicine.minTemperature} {t("To")} {medicine.maxTemperature}</p>
    </div>
}

export default StoragesByMedicineInfoBlock;
