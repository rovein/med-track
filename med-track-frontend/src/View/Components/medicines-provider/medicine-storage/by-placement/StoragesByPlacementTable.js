import React from "react";
import {withTranslation} from "react-i18next";
import getEntityColumns from "../../../util/TableUtil";
import {FIELDS} from "../AddEditMedicineStorageFormConfig";
import StoragesTable from "../StoragesTable";

function StoragesByPlacementTable({id}) {
    const columns = React.useMemo(() => {
        const columns = getEntityColumns(FIELDS, true);
        columns.splice(1, 0, {
            Header: 'FMedicineName',
            accessor: 'name'
        });
        columns.push({
            Header: 'FMedicineShelfLife',
            accessor: 'shelfLife'
        })
        columns.push({
            Header: 'ShelfLifeState',
            accessor: 'isShelfLifeExpired',
            toTranslate: true,
            applyCustomStyle: "shelfLifeStyle"
        })
        columns.push({
            Header: 'StorageConditions',
            accessor: 'storageConditions'
        })
        columns.push({
            Header: 'ConditionsState',
            accessor: 'isConditionsViolated',
            toTranslate: true,
            applyCustomStyle: "conditionsStyle"
        })
        return columns;
    }, [])

    return <StoragesTable storagesUrl={`/medicine-storages/placement/${id}`} columns={columns}/>
}

export default withTranslation()(StoragesByPlacementTable);
