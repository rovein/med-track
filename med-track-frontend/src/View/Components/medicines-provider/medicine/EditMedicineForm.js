import React, {useEffect, useState} from 'react'
import axios from "../../util/ApiUtil";
import AddEditEntityForm from "../../ui/AddEditEntityForm";
import {EDIT_FORM_NAME, FIELDS} from "./AddEditMedicineFormConfig";
import DefaultLoader from "../../ui/Loader";
import Moment from "moment";

function EditMedicineForm() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [body, setBody] = useState({})

    useEffect(() => {
        axios.get(`/medicines-providers/medicines/${localStorage.getItem("medicineId")}`)
            .then(result => {
                    const data = result.data;
                    data.shelfLife = Moment(data.shelfLife).format("YYYY-MM-DD");
                    setBody(data);
                    setIsLoaded(true);
                }
            )
    }, [])

    if (!isLoaded) return <DefaultLoader height={400} width={425} isCentered={false}/>;
    return <div className="container" style={{marginTop: "1%"}}>
        <AddEditEntityForm requestPayload={{
            function: axios.put,
            url: `/medicines-providers/${localStorage.getItem('UserEmail')}/medicines`,
            entityId: 'medicineId',
            body
        }} fields={FIELDS} formName={EDIT_FORM_NAME}/>
    </div>
}

export default EditMedicineForm
