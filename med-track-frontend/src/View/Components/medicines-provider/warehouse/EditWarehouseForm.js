import React, {useEffect, useState} from 'react'
import axios from "../../util/ApiUtil";
import {SERVER_URL} from "../../util/Constants";
import AddEditEntityForm from "../../ui/AddEditEntityForm";
import {EDIT_FORM_NAME, FIELDS} from "../../navigation/warehouse/AddEditWarehouseFormConfig";
import DefaultLoader from "../../ui/Loader";

function EditWarehouseForm() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [body, setBody] = useState({})

    useEffect(() => {
        axios.get(`${SERVER_URL}/medicines-providers/warehouses/${localStorage.getItem("warehouseId")}`)
            .then(result => {
                    setBody(result.data)
                    setIsLoaded(true);
                }
            )
    }, [])

    if (!isLoaded) {
        return <DefaultLoader height={400} width={425}/>
    }
    return <div className="container">
        <AddEditEntityForm requestPayload={{
            function: axios.post,
            url: `${SERVER_URL}/medicines-providers/${localStorage.getItem('UserEmail')}/warehouses`,
            entityId: 'warehouseId',
            body
        }} fields={FIELDS} formName={EDIT_FORM_NAME}/>
    </div>
}

export default EditWarehouseForm
