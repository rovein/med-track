import React from "react";
import {withTranslation} from "react-i18next";
import getEntityColumns from "../../../util/TableUtil";
import {FIELDS} from "../AddEditMedicineStorageFormConfig";
import StoragesTable from "../StoragesTable";

function StoragesByMedicineTable({id}) {
    const columns = React.useMemo(() => {
        const columns = getEntityColumns(FIELDS, true);
        columns.splice(1, 0, {
            Header: 'FWarehouseAddress',
            accessor: 'warehouseAddress'
        });
        columns.splice(2, 0, {
            Header: 'Placement',
            accessor: 'placement'
        });
        columns.push({
            Header: 'Temp',
            accessor: 'temperature'
        })
        columns.push({
            Header: 'ConditionsState',
            accessor: 'isConditionsViolated',
            toTranslate: true,
            applyCustomStyle: "conditionsStyle"
        })
        return columns;
    }, [])

    return <StoragesTable storagesUrl={`/medicine-storages/medicine/${id}`} columns={columns}/>
}

export default withTranslation()(StoragesByMedicineTable);
