import React, {useEffect, useState} from 'react'
import axios from "../../util/ApiUtil";
import AddEditEntityForm from "../../ui/AddEditEntityForm";
import {EDIT_FORM_NAME, FIELDS} from "./AddEditWarehouseFormConfig";
import DefaultLoader from "../../ui/Loader";
import {getCurrentUserEmail, getEditWarehouseId} from "../../util/LocalStorageUtils";

function EditWarehouseForm() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [body, setBody] = useState({})

    useEffect(() => {
        axios.get(`/medicines-providers/warehouses/${getEditWarehouseId()}`)
            .then(result => {
                    setBody(result.data)
                    setIsLoaded(true);
                }
            )
    }, [])

    if (!isLoaded) return <DefaultLoader height={400} width={425} isCentered={false}/>;
    return <div className="container">
        <AddEditEntityForm requestPayload={{
            function: axios.put,
            url: `/medicines-providers/${getCurrentUserEmail()}/warehouses`,
            entityId: 'warehouseId',
            redirectUrl: './profile',
            body
        }} fields={FIELDS} formName={EDIT_FORM_NAME}/>
    </div>
}

export default EditWarehouseForm
