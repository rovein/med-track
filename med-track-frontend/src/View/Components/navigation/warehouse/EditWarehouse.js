import React from 'react'
import Header from '../../auth/HeaderAuth'
import EditWarehouseForm from "../../medicines-provider/warehouse/EditWarehouseForm";

function EditWarehouse() {
    return (
        <div className="signIn">
            <Header/>
            <div className="container">
                <EditWarehouseForm/>
            </div>
        </div>
    )
}

export default EditWarehouse;
