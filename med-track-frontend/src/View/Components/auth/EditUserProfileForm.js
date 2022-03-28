import React from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import {withTranslation} from 'react-i18next'
import * as Constants from "../util/Constants";
import {ADMIN, MEDICINES_PROVIDER} from "../util/Constants";
import axios from "../util/ApiUtil";
import DefaultLoader from "../ui/Loader";
import {
    getCurrentMedicinesProvider,
    getCurrentUserEmail,
    getCurrentUserRole,
    getEditUserEmail,
    getEditUserRole,
    setCurrentMedicinesProvider
} from "../util/LocalStorageUtils";

const userRole = getCurrentUserRole();
const userEmail = getCurrentUserEmail();

class EditUserProfileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            phone: '',
            id: '',
            password: '',
            confirmPassword: '',
            flag: 1,
            buttonDisabled: false,
            isLoaded: false
        }
    }

    setInputValue(property, val) {
        this.setState({
            [property]: val
        })
    }

    turnOffLoader() {
        this.setState({
            buttonDisabled: false,
            isLoaded: true
        })
    }

    componentDidMount() {
        if (userRole === MEDICINES_PROVIDER) {
            if (this.checkCachedMedicinesProvider()) return;
            this.getData(`/medicines-providers/${userEmail}`);
        } else if (userRole === ADMIN) {
            if (getEditUserRole() === MEDICINES_PROVIDER) {
                this.getData(`/medicines-providers/${getEditUserEmail()}`);
            }
        }
    }

    checkCachedMedicinesProvider() {
        const cached = getCurrentMedicinesProvider();
        if (cached != null) {
            this.setState({
                isLoaded: true,
                name: cached.name,
                email: cached.email,
                phone: cached.phoneNumber,
                country: cached.country,
                id: cached.id
            })
            return true
        }
        return false
    }

    getData(resUrl) {
        axios.get(resUrl).then(result => {
            result = result.data
            this.setState({
                isLoaded: true,
                name: result.name,
                email: result.email,
                phone: result.phoneNumber,
                country: result.country,
                id: result.id
            });
        }).catch(error => {
            this.setState({
                isLoaded: true,
                error
            });
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
        let regCountry = new RegExp('^([А-Яа-яё]+)|([a-z]+)$');
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
        if (this.state.password && !this.checkPass(this.state.password)) {
            return
        }
        if (this.state.confirmPassword && !this.checkPasswords(this.state.password, this.state.confirmPass)) {
            return
        }

        this.setState({
            buttonDisabled: true,
            isLoaded: false
        })

        if (userRole === MEDICINES_PROVIDER) {
            this.editUserProfile(`/medicines-providers`);
        } else if (userRole === ADMIN) {
            if (getEditUserRole() === MEDICINES_PROVIDER) {
                this.editUserProfile(`/medicines-providers`);
            }
        }
    }

    async editUserProfile(resUrl) {
        try {
            const role = userRole !== "ADMIN" ? userRole : getEditUserRole();

            let requestBody = {
                name: this.state.name,
                email: this.state.email,
                id: this.state.id,
                phoneNumber: this.state.phone,
                country: this.state.country,
                role
            }

            if (this.state.password) {
                requestBody.password = this.state.password;
            }

            let res = await axios.put(resUrl, requestBody)
            let result = await res.data
            if (result && result.id !== null) {
                setCurrentMedicinesProvider({
                    name: this.state.name,
                    email: this.state.email,
                    id: this.state.id,
                    phoneNumber: this.state.phone,
                    country: this.state.country,
                    role: role
                });
                window.location.href = './profile';
            }
        } catch (e) {
            this.turnOffLoader()
            this.setState({flag: 13});
        }
    }

    render() {
        const {t} = this.props
        const inputClass = Constants.INPUT_STYLE_CLASSES;
        if (!this.state.isLoaded) {
            return <DefaultLoader height={425} width={425} isCentered={false}/>
        }
        return (
            <div
                className="w3-container w3-card-4 w3-light-grey w3-text-indigo w3-margin"
                style={{width: "700px"}}>
                <h1 className="w3-center">{t('Edit')}</h1>
                <div className="sized-font w3-center w3-text-red">
                    {this.state.flag === 2 && <span>{t("EEmail")}</span>}
                    {this.state.flag === 4 && <p>{t("EName")}</p>}
                    {this.state.flag === 5 && <p>{t("EPhone")}</p>}
                    {this.state.flag === 6 && <p>{t("ECountry")}</p>}
                    {this.state.flag === 10 && <p>{t("eExist")}</p>}
                    {this.state.flag === 11 && <p>{t("EPass")}</p>}
                    {this.state.flag === 12 && <p>{t("EConfirmPass")}</p>}
                    {this.state.flag === 13 && <p>{t("ErrorResponse")}</p>}
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
                            disabled="true"
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
                <h4 className="w3-center">{t("PasswordChangeMsg")}</h4>
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
                    text={t('Edit')}
                    disabled={this.state.buttonDisabled}
                    onClick={() => this.checkCred()}
                />
            </div>
        )
    }
}

export default withTranslation()(EditUserProfileForm);
