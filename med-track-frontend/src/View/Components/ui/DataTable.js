import React, {useEffect, useState} from "react";

import {
    useTable,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    usePagination,
    useSortBy
} from 'react-table'
import Button from "./Button";
import SweetAlert from "react-bootstrap-sweetalert";
import {useTranslation, withTranslation} from "react-i18next";
import axios from '../util/ApiUtil';
import DefaultLoader from "./Loader";
import _ from "lodash";

function GlobalFilter({globalFilter, setGlobalFilter, searchPlaceholder}) {
    const {t} = useTranslation();
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            <input
                className={"w3-input w3-border-bottom w3-border-black w3-hover-sand"}
                placeholder={t(searchPlaceholder)}
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
            />
        </span>
    )
}

function DefaultColumnFilter({column: {filterValue, setFilter}}) {
    return (
        <input
            value={filterValue || ''}
            style={{"width": "100px"}}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        />
    )
}

function Table({columns, data, operations, searchPlaceholder, addFormUrl}) {
    const [id, setId] = React.useState(-1)
    const [deleteClicked, setDeleteClicked] = React.useState(false)
    const [deleteUrl, setDeleteUrl] = React.useState("")
    const [deleteCallback, setDeleteCallback] = React.useState(() => (id) => console.log(id))
    const [isLoaded, setIsLoaded] = useState(true)
    const [showFilters, setShowFilters] = useState(false)

    const defaultColumn = React.useMemo(() => ({Filter: DefaultColumnFilter}), [])

    const {t} = useTranslation();
    const columnStyle = {verticalAlign: "middle"};
    const buttonStyle = {width: "120px"};
    const getFilterButtonStyles = () => {
        return showFilters ? "w3-btn w3-teal w3-round-small w3-medium" : "w3-btn w3-khaki w3-round-small w3-medium"
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: {pageIndex: 0, pageSize: 10},
            autoResetRowState: true,
            autoResetPage: true
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
    )

    function handleDeleteOperation(url, elementId, callback) {
        setId(elementId)
        setDeleteUrl(url.replace("{id}", elementId))
        setDeleteCallback(() => callback)
        setDeleteClicked(true)
    }

    function deleteEntity(url, id) {
        axios.delete(`/${url}`)
            .then(result => {
                deleteCallback(id)
                setIsLoaded(true)
            }).catch(e => {
            alert(e)
        })
    }

    if (!isLoaded) return <DefaultLoader height={325} width={325}/>;
    return (
        <div className={"w3-responsive"}>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
                searchPlaceholder={searchPlaceholder}
            />
            <table className="w3-table-all w3-large w3-centered w3-hoverable" {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <>
                        <tr {...headerGroup.getHeaderGroupProps()} className={"w3-light-grey"}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                <span>
                                    {t(column.render('Header'))}
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''}
                                </span>
                                </th>
                            ))}
                            {operations.length === 0 ? <></> :
                                <th className={"w3-centered"}>
                                    <button className={getFilterButtonStyles()}
                                            onClick={() => setShowFilters(!showFilters)}
                                            style={buttonStyle}>
                                        {t("ColumnSearch")}
                                    </button>
                                    <button
                                        className="w3-btn w3-light-blue w3-round-small w3-medium"
                                        style={buttonStyle}
                                        onClick={() => window.location.href = addFormUrl}>{t("Add")}</button>
                                </th>}
                        </tr>
                        {showFilters && <tr {...headerGroup.getHeaderGroupProps()} className={"w3-light-grey"}>
                            {headerGroup.headers.map(column =>
                                <th className={"w3-border-bottom w3-border-black"}>
                                    {column.canFilter && column.id !== 'actions' ? column.render('Filter') : null}
                                </th>
                            )}
                            {operations.length === 0 ? <></> : <th className={"w3-border-bottom w3-border-black"}/>}
                        </tr>
                        }
                    </>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, idx) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} className="w3-hover-sand">
                            {row.cells.map(cell => {
                                let style = columnStyle;
                                const customStyle = cell.column.applyCustomStyle;
                                if (customStyle) {
                                    const originalData = page[idx]?.original;
                                    style = {...columnStyle, ...originalData[customStyle]}
                                }
                                return <td style={style}{...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            <td style={columnStyle}>
                                {operations.map(operation => {
                                    return <><Button
                                        style={buttonStyle}
                                        className={operation.className}
                                        text={t(operation.name)}
                                        onClick={() => {
                                            if (operation.name === 'Delete') {
                                                handleDeleteOperation(operation.url,
                                                    row.original[operation.onClickPassParameter], operation.onClick)
                                            } else {
                                                operation.onClick(row.original[operation.onClickPassParameter])
                                            }
                                        }}
                                    />
                                    </>
                                })}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className="w3-center">
                <ul className="w3-bar w3-large">
                    <li className="w3-button w3-bar-item w3-hover-light-grey" onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}>
                        <a>{'<<'}</a>
                    </li>
                    <li className="w3-button w3-bar-item w3-hover-light-grey" onClick={() => previousPage()}
                        disabled={!canPreviousPage}>
                        <a>{'<'}</a>
                    </li>
                    <li className="w3-button w3-bar-item w3-hover-light-grey" onClick={() => nextPage()}
                        disabled={!canNextPage}>
                        <a>{'>'}</a>
                    </li>
                    <li className="w3-button w3-bar-item w3-hover-light-grey" onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}>
                        <a>{'>>'}</a>
                    </li>
                    <li className="w3-button w3-bar-item w3-hover-light-grey">
                        <a>
                            {t("Page")}{' '}
                            <strong>
                                {pageIndex + 1} / {pageOptions.length}
                            </strong>{' '}
                        </a>
                    </li>
                    <li className="w3-button w3-bar-item w3-hover-light-grey">
                        <a>
                            <input
                                className="form-control"
                                type="number"
                                min={1}
                                max={pageOptions.length}
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(page)
                                }}
                                style={{width: '100px', height: '20px'}}
                            />
                        </a>
                    </li>
                    {' '}
                    <select
                        className="w3-button w3-bar-item w3-hover-light-grey"
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                        style={{width: '180px', height: '38px'}}
                    >
                        {[5, 10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {t("Show")} {pageSize}
                            </option>
                        ))}
                    </select>
                </ul>
            </div>
            {deleteClicked && <SweetAlert
                danger
                dependencies={[deleteClicked]}
                title={t("AreYouSure")}
                customButtons={
                    <React.Fragment>
                        <button
                            className="w3-btn w3-light-grey w3-round-small w3-medium"
                            onClick={() => setDeleteClicked(false)}
                        >{t("Cancel")}</button>
                        &nbsp;
                        <button
                            className="w3-btn w3-red w3-round-small w3-medium"
                            onClick={() => {
                                setDeleteClicked(false)
                                setIsLoaded(false)
                                deleteEntity(deleteUrl, id)
                            }
                            }
                        >{t("Delete")}</button>
                    </React.Fragment>
                }
            >
                {t("NotRecover")}
            </SweetAlert>}
        </div>
    )
}

function DataTableComponent({displayData, displayColumns, operations, searchPlaceholder, addFormUrl}) {

    const sortedData = displayData.sort((current, next) => {
        return current.id - next.id
    })
    const [data, setData] = useState(sortedData)
    const columns = React.useMemo(() => [...displayColumns], [])
    const translateColumns = columns.filter(column => column.toTranslate).map(column => column.accessor)
    const {t, i18n} = useTranslation();

    function deleteEntity(id) {
        let index = data.findIndex(entry => entry.id == id);
        data.splice(index, 1)
        setData(data.filter(entry => entry.id != id))
    }

    const translateTableData = () => {
        setData(data.map(entry => {
            translateColumns.forEach(column => {
                entry[column] = t(entry[column + "Translate"])
            })
            return entry
        }))
    }

    useEffect(() => {
        operations.forEach(operation => {
            if (operation.name === "Delete") {
                operation.onClick = deleteEntity
            }
        })
        if (_.isEmpty(translateColumns)) return;
        translateTableData()
        i18n.on("languageChanged", translateTableData)
    }, [])

    return (
        <Table columns={columns} data={data} operations={operations} searchPlaceholder={searchPlaceholder}
               addFormUrl={addFormUrl}/>
    )
}

export default withTranslation()(DataTableComponent);
