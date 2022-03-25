import React from 'react'
import Header from '../../auth/HeaderAuth'
import AddWarehouseForm from "../../medicines-provider/warehouse/AddWarehouseForm";

class Add extends React.Component {

    render() {
        return (
            <div className="signIn">
                <Header/>
                <AddWarehouseForm/>
            </div>
        )
    }
}

export default Add;
