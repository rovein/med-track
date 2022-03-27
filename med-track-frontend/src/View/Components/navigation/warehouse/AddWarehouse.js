import React from 'react'
import Header from '../../auth/HeaderAuth'
import AddWarehouseForm from "../../medicines-provider/warehouse/AddWarehouseForm";

function AddWarehouse() {
    return (
        <div className="signIn">
            <Header/>
            <AddWarehouseForm/>
        </div>
    )
}

export default AddWarehouse;
