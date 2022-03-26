import React from 'react'
import {withTranslation} from 'react-i18next';

import jwt_decode from "jwt-decode"
import * as Constants from "../util/Constants";
import axios from "../util/ApiUtil";
import WarehousesTable from "./warehouse/WarehousesTable";
import MedicinesTable from "./medicine/MedicinesTable";

const url = Constants.SERVER_URL;
if (localStorage.getItem("Token") != null) {
    var token = localStorage.getItem("Token")
    var decoded = jwt_decode(token)
}

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            provider: {}
        };
    }

    componentDidMount() {
        let cachedMedicinesProvider = localStorage.getItem("medicinesProvider");
        if (cachedMedicinesProvider != null) {
            this.setState({
                isLoaded: true,
                provider: JSON.parse(cachedMedicinesProvider)
            });
            return
        }
        axios.get(`${url}/medicines-providers/${decoded.email}`)
            .then(result => {
                    this.setState({
                        isLoaded: true,
                        provider: result.data
                    });
                    localStorage.setItem("medicinesProvider", JSON.stringify(result.data));
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )
    }

    render() {
        localStorage.removeItem("Id")
        const {t} = this.props
        if (localStorage.getItem("Token") == null) {
            window.location.href = './'
        } else {
            return (
                <div>
                    <div className="w3-light-grey w3-text-black w3-border w3-border-black profile_back">
                        <p id="cName">{this.state.provider.name}</p>
                        <p></p>
                        <p>{t("Email")}: {this.state.provider.email}</p>
                        <p></p>
                        <p>{t("Phone")}: {this.state.provider.phoneNumber}</p>
                        <p></p>
                        <p>
                            {t("FCountry")}: {this.state.provider.country}
                        </p>
                    </div>
                    <div id="rooms_container">
                        <MedicinesTable/>
                    </div>
                </div>
            )
        }
    }
}

export default withTranslation()(Profile);
