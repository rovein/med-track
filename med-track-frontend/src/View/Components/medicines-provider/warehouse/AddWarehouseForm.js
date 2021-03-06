import React from 'react'
import axios from "../../util/ApiUtil";
import {SERVER_URL} from "../../util/Constants";
import AddEditEntityForm from "../../ui/AddEditEntityForm";
import {ADD_FORM_NAME, FIELDS} from "./AddEditWarehouseFormConfig";
import {getCurrentUserEmail} from "../../util/LocalStorageUtils";

function AddWarehouseForm() {
    const requestPayload = {
        function: axios.post,
        url: `${SERVER_URL}/medicines-providers/${getCurrentUserEmail()}/warehouses`,
        body: {},
        entityId: 'warehouseId',
        redirectUrl: './profile'
    }

    return <div className="container">
        <AddEditEntityForm requestPayload={requestPayload} fields={FIELDS} formName={ADD_FORM_NAME}/>
    </div>
}

export default AddWarehouseForm
