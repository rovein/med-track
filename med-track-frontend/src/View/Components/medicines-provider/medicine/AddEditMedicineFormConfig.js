export const FIELDS = [
    {
        label: 'FMedicineName',
        inputType: 'text',
        name: 'name',
        pattern: /^([А-Яа-яё]+)|([A-Za-z]+)$/i,
        error: 'EMedicineName'
    },
    {
        label: 'FMedicinePrice',
        inputType: 'number',
        name: 'price',
        pattern: /^-?\d+\.?\d*$/,
        error: 'EMedicinePrice'
    },
    {
        label: 'FMedicineStorageForm',
        inputType: 'text',
        name: 'storageForm',
        pattern: /^([А-Яа-я]+)|([A-Za-z]+)$/i,
        error: 'EMedicineStorageForm'
    },
    {
        label: 'FMedicineShelfLife',
        inputType: 'date',
        name: 'shelfLife',
        pattern: "",
        error: 'EMedicineShelfLife'
    },
    {
        label: 'FMedicineMinTemp',
        inputType: 'number',
        name: 'minTemperature',
        pattern: /^-?\d+\.?\d*$/,
        error: 'EMedicineMinTemp'
    },
    {
        label: 'FMedicineMaxTemp',
        inputType: 'number',
        name: 'maxTemperature',
        pattern: /^-?\d+\.?\d*$/,
        error: 'EMedicineMaxTemp'
    },
    {
        label: 'FMedicineMaxHumidity',
        inputType: 'number',
        name: 'maxHumidity',
        pattern: /^-?\d+\.?\d*$/,
        error: 'EMedicineMaxHumidity'
    }
]

export const ADD_FORM_NAME = {
    header: 'AddMedicine',
    submitButton: 'Add'
}

export const EDIT_FORM_NAME = {
    header: 'EditMedicine',
    submitButton: 'Edit'
}
