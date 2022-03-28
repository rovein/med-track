import React, {useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import axios from "../../util/ApiUtil";
import DefaultLoader from "../../ui/Loader";
import DataTableComponent from "../../ui/DataTable";
import getEntityColumns from "../../util/TableUtil";
import {FIELDS} from "./AddEditPlacementFormConfig";
import {
    getCurrentWarehouseId, setCurrentPlacement,
    setCurrentPlacementId,
    setEditPlacementId
} from "../../util/LocalStorageUtils";

function PlacementsTable() {
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        axios.get(`/medicines-providers/warehouses/${getCurrentWarehouseId()}/placements`)
            .then(result => {
                const data = result.data;
                const updatedData = data.map(placement => {
                    const device = placement.smartDevice;
                    return {
                        ...placement,
                        temperature: device.temperature + " °C",
                        humidity: device.humidity + " %"
                    }
                });
                setData(updatedData)
                setIsLoaded(true)
            })
    }, [])

    const columns = React.useMemo(() => {
        const columns = getEntityColumns(FIELDS, true);
        columns.push(
            {
                Header: 'Temp',
                accessor: 'temperature'
            },
            {
                Header: 'Hum',
                accessor: 'humidity'
            },
            {
                Header: 'ActualAmount',
                accessor: 'actualAmount'
            })
        return columns;
    }, [])

    function goToStoragesPage(id) {
        setCurrentPlacementId(id)
        setCurrentPlacement(data.find(placement => placement.id === id));
        window.location.href = `./storages/by-placement/${id}`;
    }

    function editEntity(id) {
        setEditPlacementId(id);
        window.location.href = "./edit-placement";
    }

    const operations = [
        {
            "name": "ToStorages",
            "onClick": goToStoragesPage,
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
            "url": "medicines-providers/warehouses/placements/{id}",
        }
    ]

    if (!isLoaded) return <DefaultLoader height={325} width={325}/>;
    return <DataTableComponent displayData={data} displayColumns={columns}
                               operations={operations} searchPlaceholder={"GlobalPlacementsSearch"}
                               addFormUrl={'./add-placement'}/>
}

export default withTranslation()(PlacementsTable);
