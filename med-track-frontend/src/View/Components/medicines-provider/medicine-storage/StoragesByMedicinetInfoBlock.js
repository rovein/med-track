import React from "react";
import {useTranslation} from "react-i18next";

function StoragesByMedicineInfoBlock({provider, medicine}) {
    const {t} = useTranslation();
    return <div className="w3-light-grey w3-text-black w3-border w3-border-black profile_back">
        <p className={'entityName'}>{provider.name}</p>
        <p className={'entityName'}>{medicine.name + ' (' + medicine.storageForm + ') ' + ' - ' + medicine.price}</p>

        <p>{t("Email")}: {provider.email}</p>
        <p>{t('FMedicineShelfLife')}: {medicine.shelfLife}</p>

        <p>{t("Phone")}: {provider.phoneNumber}</p>
        <p>{t("StorageConditions")}: {t("FMaxHumidityDetailed")} {medicine.maxHumidity}</p>

        <p>{t("FCountry")}: {provider.country}</p>
        <p>{t("Temperature")} {t("From")} {medicine.minTemperature} {t("To")} {medicine.maxTemperature}</p>
    </div>
}

export default StoragesByMedicineInfoBlock;
