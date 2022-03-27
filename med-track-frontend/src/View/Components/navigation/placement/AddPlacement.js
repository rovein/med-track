import React from 'react'
import Header from '../../auth/HeaderAuth'
import AddPlacementForm from '../../medicines-provider/placement/AddPlacementForm'

function AddPlacement() {
    return (
        <div className="signIn">
            <Header/>
            <div className="container">
                <AddPlacementForm/>
            </div>
        </div>
    )
}

export default AddPlacement;
