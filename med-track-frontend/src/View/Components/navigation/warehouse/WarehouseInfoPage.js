import Header from "../../auth/HeaderAuth";
import React from "react";
import WarehouseInfo from "../../medicines-provider/warehouse/WarehouseInfo";

function WarehouseInfoPage() {
    return (
        <div className="profile">
            <Header/>
            <WarehouseInfo/>
        </div>
    )
}

export default WarehouseInfoPage;
