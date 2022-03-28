import Header from "../../auth/HeaderAuth";
import React from "react";
import MedicineStorageInfo from "../../medicines-provider/medicine-storage/MedicineStorageInfo";

function MedicineStorageInfoPage() {
    return (
        <div className="profile">
            <Header/>
            <MedicineStorageInfo/>
        </div>
    )
}

export default MedicineStorageInfoPage;
