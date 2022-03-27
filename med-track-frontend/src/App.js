import React from 'react'
import './App.css';
import {observer} from 'mobx-react'
import {
    Route,
    Switch,
    BrowserRouter,
    Redirect
} from "react-router-dom"
import SignIn from './View/Components/navigation/auth/Login'
import SignUp from './View/Components/navigation/auth/SignUp'
import Profile from './View/Components/navigation/user/Profile'
import {withTranslation} from 'react-i18next'
import Edit from './View/Components/navigation/user/Edit';
import AddPlacement from './View/Components/navigation/placement/AddPlacement'
import Contract from './View/Components/navigation/contract/Contract'
import SignContract from './View/Components/contract/CreateContract';
import EditPlacement from './View/Components/navigation/placement/EditPlacement';
import ConfigureDevice from "./View/Components/navigation/admin/ConfigureDevice";
import AddWarehouse from "./View/Components/navigation/warehouse/AddWarehouse";
import EditWarehouse from "./View/Components/navigation/warehouse/EditWarehouse";
import AddMedicine from "./View/Components/navigation/medicine/AddMedicine";
import EditMedicine from "./View/Components/navigation/medicine/EditMedicine";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en"
        }
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route path='/login' component={SignIn}/>
                        <Route path='/signup' component={SignUp}/>

                        <Route path='/profile' component={Profile}/>
                        <Route path='/edit' component={Edit}/>

                        <Route path='/add-warehouse' component={AddWarehouse}/>
                        <Route path='/edit-warehouse' component={EditWarehouse}/>

                        <Route path='/add-medicine' component={AddMedicine}/>
                        <Route path='/edit-medicine' component={EditMedicine}/>

                        <Route path='/add-placement' component={AddPlacement}/>
                        <Route path='/edit-placement' component={EditPlacement}/>

                        <Route path='/contracts' component={Contract}/>
                        <Route path='/sign_contract' component={SignContract}/>

                        <Route path='/configure-smart-device' component={ConfigureDevice}/>
                        <Redirect from='/' to='/login'/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default withTranslation()(observer(App));
