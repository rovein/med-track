import React, {useState} from 'react'
import {useTranslation, withTranslation} from 'react-i18next'
import {getCurrentLanguage, setCurrentLanguage} from "../util/LocalStorageUtils";

function Header(props) {

    const determineInitialLanguage = () => {
        if (getCurrentLanguage() !== "UA") {
            setCurrentLanguage("EN");
            return("EN");
        } else {
            return(getCurrentLanguage);
        }
    }

    const [language, setLanguage] = useState(determineInitialLanguage);

    const onLanguageHandle = _ => {
        let newLang = language === 'EN' ? 'UA' : 'EN';
        setLanguage(newLang);
        props.i18n.changeLanguage(newLang);
    }

    const {t} = useTranslation();
    return (
        <div className="header">
            <nav>
                <ul className="nav_links">
                    <li><input type="button" id="locale" value={language} onClick={onLanguageHandle}/></li>
                    <li><a href="/login">{t("Login")}</a></li>
                    <li><a href="/signup">{t("Signup")}</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default withTranslation()(Header);
