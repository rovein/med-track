export const FIELDS = [
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
]

export const ADD_FORM_NAME = {
    header: 'AddWarehouse',
    submitButton: 'Add'
}

export const EDIT_FORM_NAME = {
    header: 'EditWarehouse',
    submitButton: 'Edit'
}
