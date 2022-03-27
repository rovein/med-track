
export default function getEntityColumns(fields) {
    const entityColumns = fields.map(field => {
        return {
            Header: field.label,
            accessor: field.name
        }
    })
    entityColumns.unshift({
        Header: 'ID',
        accessor: 'id',
    })
    return entityColumns
}
