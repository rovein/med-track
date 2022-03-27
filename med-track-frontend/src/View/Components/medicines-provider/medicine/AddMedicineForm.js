import React from 'react'
import axios from "../../util/ApiUtil";
import AddEditEntityForm from "../../ui/AddEditEntityForm";
import {ADD_FORM_NAME, FIELDS} from "./AddEditMedicineFormConfig";
import {getCurrentUserEmail} from "../../util/LocalStorageUtils";

function AddMedicineForm() {
    const requestPayload = {
        function: axios.post,
        url: `/medicines-providers/${getCurrentUserEmail()}/medicines`,
        body: {},
        entityId: 'medicineId',
        redirectUrl: './profile'
    }

    return <div className="container">
        <AddEditEntityForm requestPayload={requestPayload} fields={FIELDS} formName={ADD_FORM_NAME}/>
    </div>
}

export default AddMedicineForm
