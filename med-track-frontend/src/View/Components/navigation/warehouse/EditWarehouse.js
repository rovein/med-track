import React from 'react'
import Header from '../../auth/HeaderAuth'
import EditWarehouseForm from "../../medicines-provider/warehouse/EditWarehouseForm";

class Edit extends React.Component {

    render() {
        return (
            <div className="signIn">
                <Header/>
                <div className="container">
                    <EditWarehouseForm/>
                </div>
            </div>
        )
    }
}

export default Edit;
