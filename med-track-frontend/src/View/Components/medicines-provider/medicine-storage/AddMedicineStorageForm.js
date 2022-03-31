import React, {useEffect, useRef, useState} from 'react'
import {useTranslation, withTranslation} from 'react-i18next'
import 'react-dropdown/style.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../util/ApiUtil";
import {getCurrentUserEmail} from "../../util/LocalStorageUtils";
import DefaultLoader from "../../ui/Loader";
import _, {parseInt} from "lodash";
import {useForm} from "react-hook-form";

function AddMedicineStorageForm() {
    const [warehouseOptions, setWarehouseOptions] = useState([])
    const [selectedWarehouseId, setSelectedWarehouseId] = useState(0)

    const [placementOptions, setPlacementOptions] = useState([])
    const [placementSelectDisabled, setPlacementSelectDisabled] = useState(true)

    const [medicineOptions, setMedicineOptions] = useState([])

    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState("");
    const [errorData, setErrorData] = useState({});
    const {register, handleSubmit, formState: {errors}} = useForm()
    const {t} = useTranslation()

    const submitButtonRef = useRef(null);

    useEffect(() => {
        axios.get(`/medicines-providers/${getCurrentUserEmail()}/warehouses`)
            .then(result => {
                const data = result.data
                const options = data.map(warehouse => ({
                    value: warehouse.id,
                    label: warehouse.id + " - " + warehouse.city + ", " + warehouse.street + ", " + warehouse.house
                }));
                setWarehouseOptions(options)
            });

        axios.get(`/medicines-providers/${getCurrentUserEmail()}/medicines`)
            .then(result => {
                const data = result.data
                setMedicineOptions(data.map(medicine => ({
                    value: medicine.id,
                    label: medicine.id + " - " + medicine.name + " (" + medicine.storageForm + ")"
                })))
            });
    }, [])

    useEffect(() => {
        if (_.isEmpty(warehouseOptions) || _.isEmpty(medicineOptions)) return;
        setIsLoaded(true);
    }, [warehouseOptions, medicineOptions])

    const disablePlacementsSelect = () => {
        setPlacementSelectDisabled(true)
        submitButtonRef.current.disabled = true
    }

    const enablePlacementsSelect = () => {
        setPlacementSelectDisabled(false)
        submitButtonRef.current.disabled = false
    }

    const handleError = e => {
        if (e.response.status >= 500) {
            setError("ErrorResponse")
        } else {
            const data = e.response.data
            setError(data.errorKey)
            setErrorData(data)
        }
        setIsLoaded(true)
    }

    useEffect(async () => {
        if (selectedWarehouseId === 0) return;
        disablePlacementsSelect()
        const response = await axios.get(`/medicines-providers/warehouses/${selectedWarehouseId}/placements`)
            .catch(handleError)
        setPlacementOptions(response.data.map(placement => ({
            value: placement.id,
            label: placement.id + " - " + placement.type
        })))
        enablePlacementsSelect()
    }, [selectedWarehouseId])

    const onSubmit = data => {
        if (!_.isEmpty(errors)) return;
        setIsLoaded(false);
        axios.post('/medicine-storages', data)
            .then(result => {
                const createdStorage = result.data
                if (createdStorage) window.location.href = `./storages/by-placement/${createdStorage.placementId}`;
            })
            .catch(handleError)
    }

    const mapOptionEntries = entry => (
        <option key={entry.value} value={entry.value}>
            {entry.label}
        </option>
    )

    const addDefaultOption = (options, defaultLabel) => {
        options.unshift(<option value="" disabled selected>{defaultLabel}</option>)
        return options
    }

    if (!isLoaded) return <DefaultLoader height={400} width={425} isCentered={false}/>;
    return (
        <form className="w3-container w3-card-4 w3-light-grey w3-text-indigo w3-margin"
              style={{width: "700px", fontSize: "22px"}}
              onSubmit={handleSubmit(onSubmit)}>

            <h1 className="w3-center">{t("AddStorage")}</h1>

            <div className="sized-font w3-center w3-text-red">
                {error && <p>{t(error, errorData)}</p>}
            </div>

            <div className="w3-row w3-section">
                <select {...register("warehouseId", {required: true})} className="w3-select"
                        onChange={e => {
                            setSelectedWarehouseId(parseInt(e.target.value))
                            delete errors.warehouseId
                        }}>
                    {addDefaultOption(warehouseOptions.map(mapOptionEntries), "Оберіть склад")}
                </select>
                {errors["warehouseId"] && <small className="w3-text-red">{t("Вам потрібно обрати склад")}</small>}
            </div>

            <div className="w3-row w3-section">
                <div>
                    <select {...register("placementId", {required: true})} className="w3-select"
                            disabled={placementSelectDisabled} >
                        {addDefaultOption(placementOptions.map(mapOptionEntries), "Оберіть приміщення")}
                    </select>
                    {errors["placementId"] &&
                        <small className="w3-text-red">{t("Вам потрібно обрати приміщення")}</small>}
                </div>
            </div>

            <div className="w3-row w3-section">
                <select {...register("medicineId", {required: true})} className="w3-select">
                    {addDefaultOption(medicineOptions.map(mapOptionEntries), "Оберіть медикамент")}
                </select>
                {errors["medicineId"] && <small className="w3-text-red">{t("Вам потрібно обрати медикамент")}</small>}
            </div>

            <div className="w3-row w3-section">
                <input {...register("amount", {required: true, min: 1})} type={"number"}
                       min={0} className={"w3-input w3-border"}
                       placeholder={"Зазначте кількість"}/>
                {errors["amount"] && <small className="w3-text-red">{t("Вкажіть кількість медикаментів")}</small>}
            </div>

            <input ref={submitButtonRef}
                   className="w3-btn w3-block w3-section w3-indigo w3-padding" value={t('Add')} type="submit"/>
        </form>
    );
}

export default withTranslation()(AddMedicineStorageForm);
