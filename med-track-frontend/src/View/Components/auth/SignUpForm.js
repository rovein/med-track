import React from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import {withTranslation} from 'react-i18next'
import * as Constants from "../util/Constants";
import {MEDICINES_PROVIDER} from "../util/Constants";
import {authInstance} from '../util/ApiUtil';
import DefaultLoader from "../ui/Loader";

class SignUpForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPass: '',
            phone: '',
            country: '',
            flag: 1,
            buttonDisabled: false,
            isLoading: false
        }
    }

    setInputValue(property, val) {
        this.setState({
            [property]: val
        })
    }

    redirectRes() {
        if (this.props.role === MEDICINES_PROVIDER) {
            this.doSignUp(`/auth/register/medicines-provider`);
        }
    }

    checkEmail(email) {
        let regEmail = new RegExp('^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$');
        if (!regEmail.test(email)) {
            this.setState({flag: 2});
            return false
        }
        return true
    }

    checkName(name) {
        let regName = new RegExp('^([А-ЯЁа-яё0-9]+)|([A-Za-z0-9]+)$');
        if (!regName.test(name)) {
            this.setState({flag: 4});
            return false
        }
        return true
    }

    checkPhone(phone) {
        let regPhone = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$');
        if (!regPhone.test(phone)) {
            this.setState({flag: 5});
            return false
        }
        return true
    }

    checkCountry(country) {
        let regCountry = new RegExp('^([А-Яа-яё]+)|([A-Za-z]+)$');
        if (!regCountry.test(country)) {
            this.setState({flag: 6});
            return false
        }
        return true
    }

    checkPass(password) {
        if (password.length < 8) {
            this.setState({flag: 11});
            return false
        }
        return true
    }

    checkPasswords(password, confirmPassword) {
        if (password !== confirmPassword) {
            this.setState({flag: 12});
            return false
        }
        return true
    }

    checkCred() {
        if (!this.checkName(this.state.name)) {
            return
        }
        if (!this.checkEmail(this.state.email)) {
            return
        }
        if (!this.checkPhone(this.state.phone)) {
            return
        }
        if (!this.checkCountry(this.state.country)) {
            return
        }
        if (!this.checkPass(this.state.password)) {
            return
        }
        if (!this.checkPasswords(this.state.password, this.state.confirmPass)) {
            return
        }

        this.setState({
            buttonDisabled: true,
            isLoading: true
        })

        this.redirectRes()
    }

    async doSignUp(resUrl) {
        try {
            let res = await authInstance.post(resUrl, {
                email: this.state.email,
                phoneNumber: this.state.phone,
                password: this.state.password,
                name: this.state.name,
                country: this.state.country,
                role: this.props.role,
            })
            let result = res.data
            if (result && result.id !== null) {
                window.location.href = './login';
            }
        } catch (e) {
            const result = e.response;
            if (result.status === 400 && result.data.email) {
                this.setState({flag: 10, buttonDisabled: false, isLoading: false});
            }
        }
    }

    render() {
        const {t} = this.props
        const inputClass = Constants.INPUT_STYLE_CLASSES;
        if (this.state.isLoading) {
            return <DefaultLoader height={425} width={425} isCentered={false}/>
        }
        return (
            <div
                className="w3-container w3-card-4 w3-light-grey w3-text-indigo w3-margin"
                style={{width: "700px"}}>
                <h1 className="w3-center">{t('Signup')}</h1>
                <div className="sized-font w3-center w3-text-red">
                    {this.state.flag === 2 && <span>{t("EEmail")}</span>}
                    {this.state.flag === 4 && <p>{t("EName")}</p>}
                    {this.state.flag === 5 && <p>{t("EPhone")}</p>}
                    {this.state.flag === 6 && <p>{t("ECountry")}</p>}
                    {this.state.flag === 10 && <p>{t("eExist")}</p>}
                    {this.state.flag === 11 && <p>{t("EPass")}</p>}
                    {this.state.flag === 12 && <p>{t("EConfirmPass")}</p>}
                </div>
                <div className="w3-row w3-section">
                    <div className="w3-col" style={{width: "50px"}}>
                        <i className="w3-xxlarge fa fa-user"/>
                    </div>
                    <div className="w3-rest">
                        <Input
                            className={this.state.flag === 4 ? inputClass + " w3-border-red" : inputClass}
                            type='text'
                            placeholder={t('DName')}
                            value={this.state.name ? this.state.name : ''}
                            onChange={(val) => this.setInputValue('name', val)}
                        />
                    </div>
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
                        <i className="w3-xxlarge fas fa-phone-alt"/>
                    </div>
                    <div className="w3-rest">
                        <Input
                            className={this.state.flag === 5 ? inputClass + " w3-border-red" : inputClass}
                            type='text'
                            placeholder={t('Phone')}
                            value={this.state.phone ? this.state.phone : ''}
                            onChange={(val) => this.setInputValue('phone', val)}
                        />
                    </div>
                </div>
                <div className="w3-row w3-section">
                    <div className="w3-col" style={{width: "50px"}}>
                        <i className="w3-xxlarge fas fa-flag"/>
                    </div>
                    <div className="w3-rest">
                        <Input
                            className={this.state.flag === 6 ? inputClass + " w3-border-red" : inputClass}
                            type='text'
                            placeholder={t('FCountry')}
                            value={this.state.country ? this.state.country : ''}
                            onChange={(val) => this.setInputValue('country', val)}
                        />
                    </div>
                </div>
                <div className="w3-row w3-section">
                    <div className="w3-col" style={{width: "50px"}}>
                        <i className="w3-xxlarge fas fa-lock"/>
                    </div>
                    <div className="w3-rest">
                        <Input
                            className={(this.state.flag === 11 || this.state.flag === 12) ? inputClass + " w3-border-red" : inputClass}
                            type='password'
                            placeholder={t('Password')}
                            value={this.state.password ? this.state.password : ''}
                            onChange={(val) => this.setInputValue('password', val)}
                        />
                    </div>
                </div>
                <div className="w3-row w3-section">
                    <div className="w3-col" style={{width: "50px"}}>
                        <i className="w3-xxlarge fas fa-lock"/>
                    </div>
                    <div className="w3-rest">
                        <Input
                            className={this.state.flag === 12 ? inputClass + " w3-border-red" : inputClass}
                            type='password'
                            placeholder={t('ConfirmPassword')}
                            value={this.state.confirmPass ? this.state.confirmPass : ''}
                            onChange={(val) => this.setInputValue('confirmPass', val)}
                        />
                    </div>
                </div>
                <Button
                    className="w3-btn w3-block w3-section w3-indigo w3-padding"
                    text={t('Signup')}
                    disabled={this.state.buttonDisabled}
                    onClick={() => this.checkCred()}
                />
            </div>
        )
    }
}

export default withTranslation()(SignUpForm);
