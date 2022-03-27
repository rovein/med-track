import React, {useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import axios from "../../util/ApiUtil";
import DefaultLoader from "../../ui/Loader";
import DataTableComponent from "../../ui/DataTable";
import getEntityColumns from "../../util/TableUtil";
import {FIELDS} from "./AddEditPlacementFormConfig";

function PlacementsTable() {
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        axios.get(`/medicines-providers/warehouses/${localStorage.getItem('currentWarehouseId')}/placements`)
            .then(result => {
                const data = result.data;
                const updatedData = data.map(placement => {
                    return {
                        ...placement,
                        temperature: placement.smartDevice.temperature,
                        humidity: placement.smartDevice.humidity
                    }
                });
                setData(updatedData)
                setIsLoaded(true)
            })
    }, [])

    const columns = React.useMemo(() => {
        const columns = getEntityColumns(FIELDS);
        columns.push(
            {
                Header: 'Temp',
                accessor: 'temperature'
            },
            {
                Header: 'Hum',
                accessor: 'humidity'
            })
        return columns;
    }, [])

    function editEntity(id) {
        localStorage.setItem("placementId", id);
        window.location.href = "./edit-placement";
    }

    const operations = [
        // {
        //     "name": "More",
        //     "onClick": openMore,
        //     "className": "w3-btn w3-indigo w3-round-small w3-medium",
        //     "onClickPassParameter": "id"
        // },
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
            "url": "/medicines-providers/warehouses/placements/{id}",
        }
    ]

    if (!isLoaded) return <DefaultLoader height={325} width={325}/>;
    return <DataTableComponent displayData={data} displayColumns={columns}
                               operations={operations} searchPlaceholder={"GlobalPlacementsSearch"}/>
}

export default withTranslation()(PlacementsTable);
