import React from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import {withTranslation} from 'react-i18next'
import * as Constants from "../util/Constants";
import DefaultLoader from "../ui/Loader";
import jwt_decode from "jwt-decode";
import {authInstance} from "../util/ApiUtil";

class SignInForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            buttonDisabled: false,
            isLoaded: true,
            flag: 1
        }
    }

    setInputValue(property, val) {
        val = val.trim()
        this.setState({
            [property]: val
        })
    }

    checkEmail(email) {
        let regEmail = new RegExp('^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$');
        if (!regEmail.test(email)) {
            this.setState({flag: 2});
            return false
        }
        return true
    }

    checkPass(password) {
        if (password.length < 8) {
            this.setState({flag: 3});
            return false
        }
        return true
    }

    resetForm() {
        this.setState({
            buttonDisabled: false,
            isLoaded: true
        })
    }

    async doSignIn() {
        if (!this.checkEmail(this.state.email)) {
            return
        }
        if (!this.checkPass(this.state.password)) {
            return
        }
        this.setState({
            buttonDisabled: true,
            isLoaded: false
        })
        try {
            let res = await authInstance.post(`/auth/login`,
                {
                    email: this.state.email,
                    password: this.state.password
                }
            )
            const result = res.data;
            const token = result.token;
            localStorage.setItem('Token', token);
            const decoded = jwt_decode(token)
            localStorage.setItem('UserEmail', decoded.email);
            localStorage.setItem('UserRole', decoded.role);
            localStorage.setItem("profileShownTable", "WAREHOUSES");
            window.location.href = './profile';
        } catch (error) {
            const response = error.response
            const data = response.data
            if (data.message === "Access Denied" && data.trace.includes('account is locked')) {
                this.setState({flag: 5});
            } else {
                this.setState({flag: 4});
            }
            this.resetForm()
        }
    }

    render() {
        const {t} = this.props
        const inputClass = Constants.INPUT_STYLE_CLASSES;
        if (!this.state.isLoaded) {
            return <DefaultLoader height={400} width={425} isCentered={false}/>
        }
        return (
            <div
                className="w3-container w3-card-4 w3-light-grey w3-text-indigo w3-margin"
                style={{width: "700px"}}>
                <h1 className="w3-center">{t("Login")}</h1>
                <div className="sized-font w3-center w3-text-red">
                    {this.state.flag === 2 && <p>{t("EEmail")}</p>}
                    {this.state.flag === 3 && <p>{t("EPass")}</p>}
                    {this.state.flag === 4 && <p>{t("checkCred")}</p>}
                    {this.state.flag === 5 && <p>{t("accIsLocked")}</p>}
                </div>
                <div className="w3-row w3-section">
                    <div className="w3-col" style={{width: "50px"}}>
                        <i className="w3-xxlarge fas fa-envelope"/>
                    </div>
                    <div className="w3-rest">
                        <Input
                            className={this.state.flag === 2 ? inputClass + " w3-border-red" : inputClass}
                            type='text'
                            placeholder={t('Email')}
                            value={this.state.email ? this.state.email : ''}
                            onChange={(val) => this.setInputValue('email', val)}
                        />
                    </div>
                </div>
                <div className="w3-row w3-section">
                    <div className="w3-col" style={{width: "50px"}}>
                        <i className="w3-xxlarge fas fa-lock"/>
                    </div>
                    <div className="w3-rest">
                        <Input
                            className={this.state.flag === 3 ? inputClass + " w3-border-red" : inputClass}
                            type='password'
                            placeholder={t('Password')}
                            value={this.state.password ? this.state.password : ''}
                            onChange={(val) => this.setInputValue('password', val)}
                        />
                    </div>
                </div>
                <Button
                    className="w3-btn w3-block w3-section w3-indigo w3-padding"
                    text={t('Signin')}
                    disabled={this.state.buttonDisabled}
                    onClick={() => this.doSignIn()}
                />
            </div>
        )
    }
}

export default withTranslation()(SignInForm);
