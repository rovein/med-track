import jwt_decode from "jwt-decode";

export const TOKEN = "token";
export const CURRENT_USER_EMAIL = 'currentUserEmail';
export const CURRENT_USER_ROLE = "currentUserRole";
export const CURRENT_LANGUAGE = "i18nextLng";

export const EDIT_USER_EMAIL = "editUserEmail";
export const EDIT_USER_ROLE = "editUserRole";

export const CURRENT_MEDICINES_PROVIDER = "currentMedicinesProvider";
export const PROFILE_SHOWN_TABLE = "profileShownTable";

export const EDIT_MEDICINE_ID = "editMedicineId";
export const EDIT_WAREHOUSE_ID = "editWarehouseId";
export const EDIT_PLACEMENT_ID = "editPlacementId";

export const CURRENT_WAREHOUSE_ID = "currentWarehouseId";
export const CURRENT_WAREHOUSE = "currentWarehouse"

export const CURRENT_PLACEMENT_ID = "currentPlacementId";
export const CURRENT_PLACEMENT = "currentPlacement";

export const CURRENT_MEDICINE = "currentMedicine";


export const clearLocalStorage = () => localStorage.clear()

export const getItem = key => localStorage.getItem(key)

export const getObject = key => JSON.parse(getItem(key))

export const setItem = (key, value) => localStorage.setItem(key, value)

export const setObject = (key, value) => setItem(key, JSON.stringify(value))

export const removeItem = key => localStorage.removeItem(key)


export const checkToken = () => {
    if (getItem(TOKEN) == null) window.location.href = './'
}
export const getToken = () => getItem(TOKEN)
export const setToken = value => setItem(TOKEN, value)
export const setTokenValues = jwtToken => {
    const decoded = jwt_decode(jwtToken)
    setCurrentUserEmail(decoded.email);
    setCurrentUserRole(decoded.role);
}

export const getCurrentUserEmail = () => getItem(CURRENT_USER_EMAIL)
export const setCurrentUserEmail = value => setItem(CURRENT_USER_EMAIL, value)

export const getCurrentUserRole = () => getItem(CURRENT_USER_ROLE)
export const setCurrentUserRole = value => setItem(CURRENT_USER_ROLE, value)

export const getCurrentLanguage = () => getItem(CURRENT_LANGUAGE)
export const setCurrentLanguage = value => setItem(CURRENT_LANGUAGE, value)

export const getProfileShownTable = () => getItem(PROFILE_SHOWN_TABLE)
export const setProfileShownTable = value => setItem(PROFILE_SHOWN_TABLE, value)

export const getEditUserEmail = () => getItem(EDIT_USER_EMAIL)
export const setEditUserEmail = value => setItem(EDIT_USER_EMAIL, value)
export const removeEditUserEmail = () => removeItem(EDIT_USER_EMAIL)

export const getEditUserRole = () => getItem(EDIT_USER_ROLE)
export const setEditUserRole = value => setItem(EDIT_USER_ROLE, value)
export const removeEditUserRole = () => removeItem(EDIT_USER_ROLE)

export const getCurrentMedicinesProvider = () => getObject(CURRENT_MEDICINES_PROVIDER)
export const setCurrentMedicinesProvider = value => setObject(CURRENT_MEDICINES_PROVIDER, value)

export const getEditMedicineId = () => getItem(EDIT_MEDICINE_ID)
export const setEditMedicineId = value => setItem(EDIT_MEDICINE_ID, value)

export const getEditWarehouseId = () => getItem(EDIT_WAREHOUSE_ID)
export const setEditWarehouseId = value => setItem(EDIT_WAREHOUSE_ID, value)

export const getCurrentWarehouseId = () => getItem(CURRENT_WAREHOUSE_ID)
export const setCurrentWarehouseId = value => setItem(CURRENT_WAREHOUSE_ID, value)

export const getCurrentWarehouse = () => getObject(CURRENT_WAREHOUSE)
export const setCurrentWarehouse = value => setObject(CURRENT_WAREHOUSE, value)

export const getEditPlacementId = () => getItem(EDIT_PLACEMENT_ID)
export const setEditPlacementId = value => setItem(EDIT_PLACEMENT_ID, value)

export const getCurrentPlacementId = () => getItem(CURRENT_PLACEMENT_ID)
export const setCurrentPlacementId = value => setItem(CURRENT_PLACEMENT_ID, value)

export const getCurrentPlacement = () => getObject(CURRENT_PLACEMENT)
export const setCurrentPlacement = value => setObject(CURRENT_PLACEMENT, value)

export const getCurrentMedicine = () => getObject(CURRENT_MEDICINE)
export const setCurrentMedicine = value => setObject(CURRENT_MEDICINE, value)
