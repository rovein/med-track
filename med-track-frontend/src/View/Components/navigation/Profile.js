import React from 'react'
import Header from '../auth/HeaderAuth'
import jwt_decode from "jwt-decode"
import MedicinesProviderProfile from '../placement-owner/MedicinesProviderProfile'
import AdminProfile from '../admin/AdminProfile'
import {ADMIN, MEDICINES_PROVIDER} from "../util/Constants";

if (localStorage.getItem("Token") != null) {
    var token = localStorage.getItem("Token")
    var decoded = jwt_decode(token)
}

class Profile extends React.Component {

    render() {
        if (localStorage.getItem("Token") == null) {
            window.location.href = './'
        } else {
            if (decoded.role === MEDICINES_PROVIDER) {
                return (
                    <div className="profile">
                        <Header/>
                        <MedicinesProviderProfile/>
                    </div>
                )
            } else if (decoded.role === ADMIN) {
                return (
                    <div className="profile">
                        <Header/>
                        <AdminProfile/>
                    </div>
                )
            }
        }
    }
}

export default Profile;
