import React, {useState} from 'react'
import {useTranslation, withTranslation} from 'react-i18next'
import * as Constants from "../util/Constants";
import DefaultLoader from "../ui/Loader";
import {authInstance} from "../util/ApiUtil";
import {WAREHOUSES} from "../util/Constants";
import {setProfileShownTable, setToken, setTokenValues} from "../util/LocalStorageUtils";
import _ from "lodash";
import {useForm} from "react-hook-form";

function LoginForm() {
    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState("");
    const {register, handleSubmit, formState: {errors}} = useForm();

    const handleResult = result => {
        const token = result.data.token;
        setToken(token);
        setTokenValues(token);
        setProfileShownTable(WAREHOUSES);
        window.location.href = './profile';
    }

    const handleError = error => {
        const data = error.response.data
        if (data.trace.includes('account is locked')) {
            setError("accIsLocked")
        } else {
            setError("checkCred")
        }
        setIsLoaded(true)
    }

    const onSubmit = data => {
        if (!_.isEmpty(errors)) return;
        setIsLoaded(false);
        authInstance.post(`/auth/login`, data).then(handleResult).catch(handleError);
    }

    const {t} = useTranslation();
    const inputClass = Constants.INPUT_STYLE_CLASSES;
    const errorInputClass = inputClass + " w3-border-red";

    if (!isLoaded) return <DefaultLoader height={400} width={425} isCentered={false}/>;
    return (
        <form className="w3-container w3-card-4 w3-light-grey w3-text-indigo w3-margin" style={{width: "700px"}}
              onSubmit={handleSubmit(onSubmit)}>

            <h1 className="w3-center">{t("Login")}</h1>

            <div className="sized-font w3-center w3-text-red">
                {error && <p>{t(error)}</p>}
            </div>

            <div className="w3-row w3-section">
                <div className="w3-col" style={{width: "50px"}}>
                    <i className="w3-xxlarge fas fa-envelope"/>
                </div>
                <div className="w3-rest">
                    <input type={"text"} className={errors["email"] ? errorInputClass : inputClass}
                           placeholder={t('Email')}
                           {...register("email", {
                               required: true,
                               pattern: /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/
                           })} />
                    {errors["email"] && <div><small className="w3-text-red">{t("EEmail")}</small><br/></div>}
                </div>
            </div>

            <div className="w3-row w3-section">
                <div className="w3-col" style={{width: "50px"}}>
                    <i className="w3-xxlarge fas fa-lock"/>
                </div>
                <div className="w3-rest">
                    <input type={"password"} className={errors["password"] ? errorInputClass : inputClass}
                           placeholder={t('Password')}
                           {...register("password", {
                               required: true,
                               pattern: /^.{8,20}$/
                           })} />
                    {errors["password"] && <div><small className="w3-text-red">{t("EPass")}</small><br/></div>}
                </div>
            </div>

            <input className="w3-btn w3-block w3-section w3-indigo w3-padding" value={t('Signin')} type="submit"/>
        </form>
    );
}

export default withTranslation()(LoginForm);
