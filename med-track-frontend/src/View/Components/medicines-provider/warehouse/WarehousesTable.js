import React, {useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import jwt_decode from "jwt-decode";
import axios from "../../util/ApiUtil";
import DefaultLoader from "../../ui/Loader";
import DataTableComponent from "../../ui/DataTable";
import * as Constants from "../../util/Constants";

function WarehousesTable() {
    const baseUrl = Constants.SERVER_URL;
    let decoded
    if (localStorage.getItem("Token") != null) {
        decoded = jwt_decode(localStorage.getItem("Token"));
    }

    const dataUrl = `${baseUrl}/medicines-providers/${decoded.email}/warehouses`
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        axios.get(dataUrl)
            .then(result => {
                const data = result.data
                setData(data)
                setIsLoaded(true)
            })
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: "FCity",
                accessor: 'city',
            },
            {
                Header: "FStreet",
                accessor: 'street'
            },
            {
                Header: "FHouse",
                accessor: 'house'
            }
        ],
        []
    )

    function editEntity(id) {
        localStorage.setItem("warehouseId", id);
        window.location.href = "./edit_warehouse";
    }

    function goToPlacementsPage(id) {
        localStorage.setItem("warehouseId", id);
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
