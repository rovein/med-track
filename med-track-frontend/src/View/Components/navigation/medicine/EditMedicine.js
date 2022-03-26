import React from 'react'
import Header from '../../auth/HeaderAuth'
import EditMedicineForm from "../../medicines-provider/medicine/EditMedicineForm";

function EditMedicine() {
    return (
        <div className="signIn">
            <Header/>
            <div className="container" style={{marginTop: "1%"}}>
                <EditMedicineForm/>
            </div>
        </div>
    )
}

export default EditMedicine;
