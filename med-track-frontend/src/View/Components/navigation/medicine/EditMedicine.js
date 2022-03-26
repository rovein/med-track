import React from 'react'
import Header from '../../auth/HeaderAuth'
import EditMedicineForm from "../../medicines-provider/medicine/EditMedicineForm";

function EditMedicine() {
    return (
        <div className="signIn">
            <Header/>
            <div className="container">
                <EditMedicineForm/>
            </div>
        </div>
    )
}

export default EditMedicine;
