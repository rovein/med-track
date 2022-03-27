import React from 'react'
import {withTranslation} from 'react-i18next';
import {ADMIN, MEDICINES_PROVIDER} from "../util/Constants";
import {checkToken, clearLocalStorage, getCurrentLanguage, getCurrentUserRole, setCurrentLanguage} from "../util/LocalStorageUtils";

class Header extends React.Component {
    signout() {
        const language = getCurrentLanguage();
        clearLocalStorage();
        setCurrentLanguage(language)
        window.location.href = '/';
    }

    constructor(props) {
        super(props)
        if (getCurrentLanguage() !== "UA") {
            this.state = {
                value: "EN"
            }
            setCurrentLanguage("EN")
        } else {
            this.state = {
                value: getCurrentLanguage()
            }
        }
        checkToken()
    }

    onLanguageHandle = _ => {
        if (this.state.value === 'EN') {
            let newLang = 'UA';
            this.setState({value: newLang})
            this.props.i18n.changeLanguage(newLang)
        } else if (this.state.value === 'UA') {
            let newLang = 'EN';
            this.setState({value: newLang})
            this.props.i18n.changeLanguage(newLang)
        }
    }

    render() {
        const {t} = this.props
        if (getCurrentUserRole() === MEDICINES_PROVIDER) {
            return (
                <div className="header">
                    <nav>
                        <ul className="nav_links">
                            <li><input type="button" id="locale" value={this.state.value} onClick={() => {
                                this.onLanguageHandle()
                            }}/></li>
                            <li><a href="/profile" id="PR">{t("Profile")}</a></li>
                            <li><a href="/edit" id="PR">{t('EditP')}</a></li>
                            <li><a onClick={() => this.signout()} id="SO">{t("Signout")}</a></li>
                        </ul>
                    </nav>
                </div>
            )
        } else if (getCurrentUserRole() === ADMIN)
            return (
                <div className="header">
                    <nav>
                        <ul className="nav_links">
                            <li><input type="button" id="locale" value={this.state.value} onClick={() => {
                                this.onLanguageHandle()
                            }}/></li>
                            <li><a href="/profile" id="PR">{t("Profile")}</a></li>
                            <li><a href="/configure-smart-device" id="SM">{t("ConfigureDevice")}</a></li>
                            <li><a id="BC">{t("Backup")}</a></li>
                            <li><a onClick={() => this.signout()} id="SO">{t("Signout")}</a></li>
                        </ul>
                    </nav>
                </div>
            )
    }
}


export default withTranslation()(Header);
