import React from 'react'
import {withTranslation} from 'react-i18next';
import AdminMedicinesProvidersTable from './AdminMedicinesProvidersTable';
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import * as Constants from "../util/Constants";
import {getToken, removeEditUserEmail, removeEditUserRole} from "../util/LocalStorageUtils";

const url = Constants.SERVER_URL;
const FileDownload = require("js-file-download");

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            backupButtonClicked: false
        };
        this.backup = this.backup.bind(this)
        this.closeBackupAlert = this.closeBackupAlert.bind(this)
    }

    componentDidMount() {
        const backupNav = document.getElementById("BC");
        backupNav.onclick = this.backup
    }

    backup() {
        this.setState({backupButtonClicked: true})
        axios({
            url: `${url}/admin/backup`,
            method: "GET",
            headers: {
                Accept: "application/octet-stream",
                "Content-Type": "application/octet-stream",
                "Content-Disposition": "attachment; filename='backup_data.sql'",
                Authorization: "Bearer " + getToken(),
            },
            responseType: "blob",
        }).then((response) => {
            FileDownload(response.data, `backup_data.sql`);
        });
    }

    render() {
        removeEditUserEmail();
        removeEditUserRole();
        const adminBack = {
            textAlign: "center",
            fontSize: "25px",
            padding: "0 0 0 0"
        }
        const {t} = this.props
        return (
            <div>
                <div className="rooms_back" style={{border: "1px solid black"}}>
                    <p id="EMP" style={adminBack}>{t("Provider")}</p>
                </div>
                <div id="room_container">
                    <AdminMedicinesProvidersTable/>
                </div>
                {this.state.backupButtonClicked &&
                    <SweetAlert success title={t("Success")}
                                onConfirm={this.closeBackupAlert}
                                onCancel={this.closeBackupAlert}
                                customButtons={
                                    <React.Fragment>
                                        <button
                                            className="w3-btn w3-indigo w3-round-small w3-medium"
                                            onClick={this.closeBackupAlert}
                                        >OK
                                        </button>
                                    </React.Fragment>
                                }
                    >
                        {t("BackupWillDownload")}
                    </SweetAlert>}
            </div>
        )
    }

    closeBackupAlert() {
        this.setState({backupButtonClicked: false})
    }

}

export default withTranslation()(Profile);
