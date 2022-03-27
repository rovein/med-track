import React, {useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import axios from "../../util/ApiUtil";
import DefaultLoader from "../../ui/Loader";
import DataTableComponent from "../../ui/DataTable";
import {FIELDS} from "./AddEditWarehouseFormConfig";
import getEntityColumns from "../../util/TableUtil";

function WarehousesTable() {
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        axios.get(`/medicines-providers/${localStorage.getItem('UserEmail')}/warehouses`)
            .then(result => {
                const data = result.data
                setData(data)
                setIsLoaded(true)
            })
    }, [])

    const columns = React.useMemo(() => getEntityColumns(FIELDS), [])

    function editEntity(id) {
        localStorage.setItem("warehouseId", id);
        window.location.href = "./edit-warehouse";
    }

    function goToPlacementsPage(id) {
        localStorage.setItem("currentWarehouseId", id);
        window.location.href = "./placements";
    }

    const operations = [
        {
            "name": "ToPlacements",
            "onClick": goToPlacementsPage,
            "className": "w3-btn w3-indigo w3-round-small w3-medium",
            "onClickPassParameter": "id"
        },
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
            "url": "medicines-providers/warehouses/{id}",
        }
    ]

    if (!isLoaded) return <DefaultLoader height={325} width={325}/>;
    return <DataTableComponent displayData={data} displayColumns={columns}
                               operations={operations} searchPlaceholder={"GlobalWarehousesSearch"}/>
}

export default withTranslation()(WarehousesTable);
