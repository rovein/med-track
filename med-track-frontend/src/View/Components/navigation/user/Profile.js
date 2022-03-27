import React from 'react'
import Header from '../../auth/HeaderAuth'
import MedicinesProviderProfile from '../../medicines-provider/MedicinesProviderProfile'
import AdminProfile from '../../admin/AdminProfile'
import {ADMIN, MEDICINES_PROVIDER} from "../../util/Constants";
import {checkToken, getCurrentUserRole} from "../../util/LocalStorageUtils";

function Profile() {
    checkToken();
    return (
        <div className="profile">
            <Header/>
            {getCurrentUserRole() === MEDICINES_PROVIDER ? <MedicinesProviderProfile/>
                : getCurrentUserRole() === ADMIN ? <AdminProfile/> : <></>}
        </div>
    )

}

export default Profile;
