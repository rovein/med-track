import React, {useState} from 'react'
import {useTranslation, withTranslation} from 'react-i18next';
import {ADMIN, MEDICINES_PROVIDER} from "../util/Constants";
import {
    checkToken,
    clearLocalStorage,
    getCurrentLanguage,
    getCurrentUserRole,
    setCurrentLanguage
} from "../util/LocalStorageUtils";
import {determineInitialLanguage, onLanguageHandle} from "../util/LocalizationUtil";

function Header(props) {

    checkToken()

    const [language, setLanguage] = useState(determineInitialLanguage());

    const signOut = _ => {
        const language = getCurrentLanguage();
        clearLocalStorage();
        setCurrentLanguage(language)
        window.location.href = '/';
    }

    const {t} = useTranslation();
    return (
        <div className="header">
            <nav>
                <ul className="nav_links">
                    <li><input type="button" id="locale" value={language}
                               onClick={() => onLanguageHandle(language, setLanguage, props.i18n)}/></li>
                    <li><a href="/profile" id="PR">{t("Profile")}</a></li>
                    {getCurrentUserRole() === MEDICINES_PROVIDER &&
                        <li><a href="/edit" id="PR">{t('EditP')}</a></li>}
                    {getCurrentUserRole() === ADMIN && <>
                        <li><a href="/configure-smart-device" id="SM">{t("ConfigureDevice")}</a></li>
                        <li><a id="BC">{t("Backup")}</a></li>
                    </>}
                    <li><a onClick={signOut} id="SO">{t("Signout")}</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default withTranslation()(Header);
