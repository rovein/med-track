export const FIELDS = [
    {
        label: 'FAmount',
        inputType: 'number',
        name: 'amount',
        pattern: /^-?\d+\.?\d*$/,
        error: 'EMedicinePrice'
    },
    {
        label: 'FStartDate',
        inputType: 'date',
        name: 'startDate',
        pattern: '',
        error: 'EMedicineName'
    }
]

export const ADD_FORM_NAME = {
    header: 'AddStorage',
    submitButton: 'Add'
}

export const EDIT_FORM_NAME = {
    header: 'EditStorage',
    submitButton: 'Edit'
}
