import React from 'react'
import {useForm} from 'react-hook-form';
import {useTranslation, withTranslation} from 'react-i18next'
import * as Constants from "../../util/Constants";
import _ from "lodash";
import axios from "../../util/ApiUtil";
import {SERVER_URL} from "../../util/Constants";

function AddWarehouseForm() {
    const {t} = useTranslation();
    const inputClass = Constants.INPUT_STYLE_CLASSES;
    const errorInputClass = inputClass + " w3-border-red";
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = data => {
        if (!_.isEmpty(errors)) return;
        const email = localStorage.getItem('UserEmail')
        axios.post(`${SERVER_URL}/medicines-providers/${email}/warehouses`, data)
            .then(result => {
                if (result.data) {
                    window.location.href = './profile';
                }
            })
    };

    return (
        <form className="w3-container w3-card-4 w3-light-grey w3-text-indigo w3-margin"
              style={{width: "700px", fontSize: "22px"}} onSubmit={handleSubmit(onSubmit)}>
            <h1 className="w3-center">{t('AddWarehouse')}</h1>

            <label>{t("FCity")}</label>
            <input type="text" className={errors.city ? errorInputClass : inputClass}
                   {...register("city", {
                       required: true,
                       pattern: /^([А-Яа-яё]+)|([A-Za-z]+)$/i
                   })} />
            {errors.city && <div><small className="w3-text-red">{t("ECity")}</small><br/></div>}

            <label>{t("FStreet")}</label>
            <input type="text" className={errors.street ? errorInputClass : inputClass}
                   {...register("street", {
                       required: true,
                       pattern: /^([А-Яа-яё]+)|([A-Za-z]+)$/i
                   })} />
            {errors.street && <div><small className="w3-text-red">{t("EStreet")}</small><br/></div>}

            <label>{t("FHouse")}</label>
            <input type="text" className={errors.house ? errorInputClass : inputClass}
                   {...register("house", {
                       required: true,
                       pattern: /^([0-9]+)|([0-9А-Яа-я]+)|([0-9A-Za-z]+)$/i
                   })} />
            {errors.house && <div><small className="w3-text-red">{t("EHouse")}</small><br/></div>}

            <input className="w3-btn w3-block w3-section w3-indigo w3-padding" value={t('Add')}
                   type="submit"/>
        </form>
    );
}

export default withTranslation()(AddWarehouseForm)
