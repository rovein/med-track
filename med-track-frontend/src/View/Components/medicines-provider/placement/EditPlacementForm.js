import React, {useEffect, useState} from 'react'
import {withTranslation} from 'react-i18next'
import axios from "../../util/ApiUtil";
import DefaultLoader from "../../ui/Loader";
import AddEditEntityForm from "../../ui/AddEditEntityForm";
import {EDIT_FORM_NAME, FIELDS} from "./AddEditPlacementFormConfig";
import {getCurrentWarehouseId, getEditPlacementId} from "../../util/LocalStorageUtils";

function EditPlacementForm() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [body, setBody] = useState({})

    useEffect(() => {
        axios.get(`/medicines-providers/warehouses/placements/${getEditPlacementId()}`)
            .then(result => {
                    const data = result.data;
                    setBody(data);
                    setIsLoaded(true);
                }
            )
    }, [])

    if (!isLoaded) return <DefaultLoader height={400} width={425} isCentered={false}/>;
    return <div className="container">
        <AddEditEntityForm requestPayload={{
            function: axios.put,
            url: `/medicines-providers/warehouses/${getCurrentWarehouseId()}/placements`,
            entityId: 'placementId',
            redirectUrl: './placements',
            body
        }} fields={FIELDS} formName={EDIT_FORM_NAME}/>
    </div>
}

export default withTranslation()(EditPlacementForm);
