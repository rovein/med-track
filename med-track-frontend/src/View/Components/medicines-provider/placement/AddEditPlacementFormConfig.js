export const FIELDS = [
    {
        label: 'FPlacementType',
        inputType: 'text',
        name: 'type',
        pattern: /^([А-Яа-яё0-9]+)|([A-Za-z0-9]+)$/i,
        error: 'EPlacementType'
    }
]

export const ADD_FORM_NAME = {
    header: 'AddPlacement',
    submitButton: 'Add'
}

export const EDIT_FORM_NAME = {
    header: 'EditPlacement',
    submitButton: 'Edit'
}
