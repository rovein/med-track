import Header from "../../auth/HeaderAuth";
import React from "react";
import AddMedicineStorageForm from "../../medicines-provider/medicine-storage/AddMedicineStorageForm";

function AddMedicineStorage() {
    return (
        <div className="signIn">
            <Header/>
            <div className="container">
                <AddMedicineStorageForm/>
            </div>
        </div>
    )
}

export default AddMedicineStorage;
