import React, {useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import axios from "../../util/ApiUtil";
import DefaultLoader from "../../ui/Loader";
import DataTableComponent from "../../ui/DataTable";
import {FIELDS} from "./AddEditMedicineFormConfig";
import Moment from "moment";
import getEntityColumns from "../../util/TableUtil";

function MedicinesTable() {
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        axios.get(`/medicines-providers/${localStorage.getItem("UserEmail")}/medicines`)
            .then(result => {
                const data = result.data.map(medicine => {
                    medicine.price = medicine.price + " ₴"
                    medicine.minTemperature = medicine.minTemperature + " °C"
                    medicine.maxTemperature = medicine.maxTemperature + " °C"
                    medicine.maxHumidity = medicine.maxHumidity + " %"
                    medicine.shelfLife = Moment(medicine.shelfLife).format('DD.MM.YYYY');
                    return medicine
                })
                setData(data)
                setIsLoaded(true)
            })
    }, [])

    const columns = React.useMemo(() => getEntityColumns(FIELDS), [])

    function editEntity(id) {
        localStorage.setItem("medicineId", id);
        window.location.href = "./edit-medicine";
    }

    const operations = [
        {
            "name": "Edit",
            "onClick": editEntity,
            "className": "w3-btn w3-khaki w3-round-small w3-medium",
            "onClickPassParameter": "id"
        },
        {
            "name": "Delete",
            "className": "w3-btn w3-red w3-round-small w3-medium",
            "onClickPassParameter": "id",
            "url": "medicines-providers/medicines/{id}",
        }
    ]

    if (!isLoaded) return <DefaultLoader height={325} width={325}/>;
    return <DataTableComponent displayData={data} displayColumns={columns}
                               operations={operations} searchPlaceholder={"GlobalMedicinesSearch"}/>
}

export default withTranslation()(MedicinesTable);