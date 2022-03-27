import React from 'react'
import Button from '../ui/Button'
import {withTranslation} from 'react-i18next'
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "../util/ApiUtil";
import * as Constants from "../util/Constants";
import DefaultLoader from "../ui/Loader";
import {MEDICINES_PROVIDER} from "../util/Constants";
import {setEditUserEmail, setEditUserRole} from "../util/LocalStorageUtils";

const url = Constants.SERVER_URL;

class AdminMedicinesProvidersTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            providers: [],
            deleteButtonClicked: false,
            ownerEmail: ''
        };
    }

    componentDidMount() {
        axios.get(`/medicines-providers`)
            .then(result => {
                    this.setState({
                        isLoaded: true,
                        providers: result.data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {t} = this.props
        const {error, isLoaded, providers} = this.state;
        if (error) {
            return <div className='additional'>{t("Failiture")}: {error.message}</div>;
        } else if (!isLoaded) {
            return <DefaultLoader height={400} width={425} isCentered={false}
                                  style={{marginLeft: '36%', paddingTop: '20px'}}/>
        } else {
            return (
                <div>
                    <table className="w3-table-all w3-centered w3-hoverable w3-large">
                        <thead>
                        <tr className="w3-light-grey">
                            <th>{t("DName")}</th>
                            <th>{t("Phone")}</th>
                            <th>{t("Email")}</th>
                            <th>{t("IsLocked")}</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {providers.map(this.renderCard)}
                        </tbody>
                    </table>
                    {this.state.deleteButtonClicked && <SweetAlert
                        danger
                        dependencies={[this.state.deleteButtonClicked]}
                        title={t("AreYouSure")}
                        customButtons={
                            <React.Fragment>
                                <button
                                    className="w3-btn w3-light-grey w3-round-small w3-medium"
                                    onClick={() => this.setState({deleteButtonClicked: false})}
                                >{t("Cancel")}</button>
                                &nbsp;
                                <button
                                    className="w3-btn w3-red w3-round-small w3-medium"
                                    onClick={() => this.deleteProvider(this.state.ownerEmail)}
                                >{t("Delete")}</button>
                            </React.Fragment>
                        }
                    >
                    </SweetAlert>}
                </div>
            );
        }
    }

    deleteProvider(email) {
        this.setState({isLoaded: false})
        axios.delete(`/medicines-providers/${email}`).then(result => {
                this.setState({
                    providers: this.state.providers.filter(company => {
                            return company.email !== email
                        }
                    ),
                    isLoaded: true,
                    deleteButtonClicked: false
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    renderCard = provider => {
        const {t} = this.props
        const columnStyle = {verticalAlign: "middle"};
        return (
            <tr className="w3-hover-sand">
                <td style={columnStyle}>{provider.name}</td>
                <td style={columnStyle}>{provider.phoneNumber}</td>
                <td style={columnStyle}>{provider.email}</td>
                <td style={columnStyle}>{provider.isLocked
                    ? <i className="w3-xxlarge w3-text-red fas fa-times"/>
                    : <i className="w3-xxlarge w3-text-green fas fa-check"/>
                }
                </td>
                <td>
                    <Button
                        className="w3-btn w3-indigo w3-round-small w3-medium"
                        text={provider.isLocked ? t("UnlockUser") : t("LockUser")}
                        onClick={() => this.lockUser(provider.email)}
                    /> &nbsp;
                    <Button
                        className='w3-btn w3-khaki w3-round-small w3-medium'
                        text={t('Edit')}
                        onClick={_ => {
                            setEditUserEmail(provider.email)
                            setEditUserRole(MEDICINES_PROVIDER)
                            window.location.href = './edit';
                        }}/> &nbsp;
                    <Button
                        className='w3-btn w3-red w3-round-small w3-medium'
                        text={t('Delete')}
                        onClick={() => this.setState({deleteButtonClicked: true, ownerEmail: provider.email})}
                    />
                </td>
            </tr>
        );
    };

    lockUser(email) {
        this.setState({isLoaded: false})
        axios.post(`${url}/admin/lock-user/${email}`).then(result => {
                let idx = this.state.providers.findIndex(owner => owner.email === email);
                let owners = this.state.providers;
                owners[idx].isLocked = !owners[idx].isLocked;
                this.setState({providers: owners, isLoaded: true})
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            }
        );
    }
}

export default withTranslation()(AdminMedicinesProvidersTable);
