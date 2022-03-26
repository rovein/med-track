import React from 'react'
import Header from '../auth/HeaderAuth'
import MoreInfo from "../medicines-provider/warehouse/placement/PlacementMoreInfo";

class Info extends React.Component{

  render() {
    return(<div className="profile">
      <Header/>
      <MoreInfo/>
    </div>);
  }
}

export default Info;
