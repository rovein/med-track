import React from 'react'
import Header from '../../auth/HeaderAuth'
import EditPlacementForm from '../../medicines-provider/placement/EditPlacementForm'

function EditPlacement() {
    return (
        <div className="signIn">
            <Header/>
            <div className="container">
                <EditPlacementForm/>
            </div>
        </div>
    )
}

export default EditPlacement;
