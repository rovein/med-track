import React from 'react'
import Header from '../../auth/HeaderAuth'
import AddMedicineForm from "../../medicines-provider/medicine/AddMedicineForm";

function AddMedicine() {
    return (
        <div className="signIn">
            <Header/>
            <AddMedicineForm/>
        </div>
    )
}

export default AddMedicine;
