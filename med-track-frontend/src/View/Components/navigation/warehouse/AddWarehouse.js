import React from 'react'
import Header from '../../auth/HeaderAuth'
import AddWarehouseForm from "../../medicines-provider/warehouse/AddWarehouseForm";
import AddEditEntityForm from "../../ui/AddEditEntityForm";
import axios from "../../util/ApiUtil";
import {SERVER_URL} from "../../util/Constants";

class Add extends React.Component {

    render() {
        return (
            <div className="signIn">
                <Header/>
                <div className="container">
                    <AddEditEntityForm requestPayload={{
                        function: axios.post,
                        url: `${SERVER_URL}/medicines-providers/${localStorage.getItem('UserEmail')}/warehouses`,
                        body: {id: 1, city: 'Харків', street: 'Бакуліна', house: '22'}
                    }} fields={[
                        {
                            label: 'FCity',
                            inputType: 'text',
                            name: 'city',
                            pattern: /^([А-Яа-яё]+)|([A-Za-z]+)$/i,
                            error: 'ECity'
                        },
                        {
                            label: 'FStreet',
                            inputType: 'text',
                            name: 'street',
                            pattern: /^([А-Яа-яё]+)|([A-Za-z]+)$/i,
                            error: 'EStreet'
                        },
                        {
                            label: 'FHouse',
                            inputType: 'text',
                            name: 'house',
                            pattern: /^([0-9]+)|([0-9А-Яа-я]+)|([0-9A-Za-z]+)$/i,
                            error: 'EHouse'
                        }
                    ]} formName={{
                        header: 'AddWarehouse',
                        submitButton: 'Add'
                    }}/>
                </div>
            </div>
        )
    }
}

export default Add;
