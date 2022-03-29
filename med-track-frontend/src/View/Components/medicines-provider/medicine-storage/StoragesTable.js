import React, {useEffect, useState} from "react";
import axios from "../../util/ApiUtil";
import {formatMedicineStorageData} from "../../util/DataFormattingUtil";
import DefaultLoader from "../../ui/Loader";
import DataTableComponent from "../../ui/DataTable";
import {withTranslation} from "react-i18next";

function StoragesTable({storagesUrl, columns}) {
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        axios.get(storagesUrl)
            .then(result => {
                setData(result.data.map(formatMedicineStorageData))
                setIsLoaded(true)
            })
    }, [])

    const operations = [
        {
            "name": "Edit",
            "onClick": id => window.location.href = `./edit-storage/${id}`,
            "className": "w3-btn w3-khaki w3-round-small w3-medium",
            "onClickPassParameter": "id"
        },
        {
            "name": "Delete",
            "className": "w3-btn w3-red w3-round-small w3-medium",
            "onClickPassParameter": "id",
            "url": "medicine-storages/{id}",
        }
    ]

    if (!isLoaded) return <DefaultLoader height={325} width={325}/>;
    return <DataTableComponent displayData={data} displayColumns={columns}
                               operations={operations} searchPlaceholder={"GlobalStoragesSearch"}
                               addFormUrl={'./add-storage'}/>
}

export default withTranslation()(StoragesTable);
