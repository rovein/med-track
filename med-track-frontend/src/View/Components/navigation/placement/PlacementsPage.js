import Header from "../../auth/HeaderAuth";
import React from "react";
import PlacementsProfile from "../../medicines-provider/placement/PlacementsProfile";

function PlacementsPage() {
    return (
        <div className="profile">
            <Header/>
            <PlacementsProfile/>
        </div>
    )
}

export default PlacementsPage;
