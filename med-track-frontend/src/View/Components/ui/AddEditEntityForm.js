import React, {useState} from 'react'
import {useForm} from 'react-hook-form';
import {useTranslation, withTranslation} from 'react-i18next'
import * as Constants from "../util/Constants";
import _ from "lodash";
import DefaultLoader from "./Loader";

/*
fields:
[
  {
    label: 'FCity',
    inputType: 'text',
    name: 'city',
    pattern: /^([А-Яа-яё]+)|([A-Za-z]+)$/i,
    error: 'ECity',
    iconClassName: 'w3-xxlarge fas fa-city'
  },
  {
    label: 'FStreet',
    inputType: 'text',
    name: 'street',
    pattern: /^([А-Яа-яё]+)|([A-Za-z]+)$/i,
    error: 'EStreet',
    iconClassName: 'w3-xxlarge fas fa-road'
  },
  {
   label: 'FHouse',
    inputType: 'text',
    name: 'house',
    pattern: /^([0-9]+)|([0-9А-Яа-я]+)|([0-9A-Za-z]+)$/i,
    error: 'EHouse',
    iconClassName: 'w3-xxlarge fas fa-home'
  }
]

requestPayload:
{
    function: axios.post,
    url: `${SERVER_URL}/medicines-providers/${localStorage.getItem('UserEmail')}/warehouses`,
    body: {id: 1, city: 'Харків', street: 'Бакуліна', house: '22'},
    entityId: 'warehouseId'
}

formName:
{
    header: 'AddWarehouse',
    submitButton: 'Add'
}
 */
function AddEditEntityForm({requestPayload, fields, formName}) {
    const {t} = useTranslation();
    const inputClass = Constants.INPUT_STYLE_CLASSES;
    const errorInputClass = inputClass + " w3-border-red";
    const requestBody = requestPayload.body;

    const [isLoaded, setIsLoaded] = useState(true);
    const [isErrorResponse, setIsErrorResponse] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = data => {
        if (!_.isEmpty(errors)) return;
        setIsLoaded(false)
        requestPayload.function(requestPayload.url, data)
            .then(result => {
                    if (result.data) {
                        localStorage.removeItem(requestPayload.entityId)
                        window.location.href = './profile';
                    }
                },
                error => {
                    console.log(error);
                    setIsErrorResponse(true);
                }
            )
    };

    if (!isLoaded) {
        return <DefaultLoader height={400} width={425}/>
    }
    return (
        <form className="w3-container w3-card-4 w3-light-grey w3-text-indigo w3-margin"
              style={{width: "700px", fontSize: "22px"}} onSubmit={handleSubmit(onSubmit)}>
            <h1 className="w3-center">{t(formName.header)}</h1>
            <input type="number" hidden={true} value={requestBody.id} {...register("id", {valueAsNumber: true})}/>
            <div className="sized-font w3-center w3-text-red">
                {isErrorResponse && <p>{t("Error")}</p>}
            </div>
            {
                fields.map(field =>
                    <div>
                        <label>{t(field.label)}</label>
                        <input type={field.inputType} className={errors[field.name] ? errorInputClass : inputClass}
                               defaultValue={requestBody[field.name]}
                               {...register(field.name, {
                                   required: true,
                                   pattern: field.pattern
                               })} />
                        {errors[field.name] && <div><small className="w3-text-red">{t(field.error)}</small><br/></div>}
                    </div>
                )
            }

            <input className="w3-btn w3-block w3-section w3-indigo w3-padding" value={t(formName.submitButton)}
                   type="submit"/>
        </form>
    );
}

export default withTranslation()(AddEditEntityForm)
