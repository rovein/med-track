import React from 'react'
import axios from "../../util/ApiUtil";
import {SERVER_URL} from "../../util/Constants";
import AddEditEntityForm from "../../ui/AddEditEntityForm";
import {ADD_FORM_NAME, FIELDS} from "../../navigation/warehouse/AddEditWarehouseFormConfig";

function AddWarehouseForm() {
    const requestPayload = {
        function: axios.post,
        url: `${SERVER_URL}/medicines-providers/${localStorage.getItem('UserEmail')}/warehouses`,
        body: {},
        entityId: 'warehouseId'
    }

    return <div className="container">
        <AddEditEntityForm requestPayload={requestPayload} fields={FIELDS} formName={ADD_FORM_NAME}/>
    </div>
}

export default AddWarehouseForm
