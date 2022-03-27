import React from 'react'
import { withTranslation } from 'react-i18next'
import axios from "../../util/ApiUtil";
import AddEditEntityForm from "../../ui/AddEditEntityForm";
import {ADD_FORM_NAME, FIELDS} from "./AddEditPlacementFormConfig";
import {getCurrentWarehouseId} from "../../util/LocalStorageUtils";

function AddPlacementForm() {
    const requestPayload = {
        function: axios.post,
        url: `/medicines-providers/warehouses/${getCurrentWarehouseId()}/placements`,
        body: {},
        entityId: 'placementId',
        redirectUrl: './placements'
    }

    return <div className="container">
        <AddEditEntityForm requestPayload={requestPayload} fields={FIELDS} formName={ADD_FORM_NAME}/>
    </div>
}

export default withTranslation() (AddPlacementForm);
