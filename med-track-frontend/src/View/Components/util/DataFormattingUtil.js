import Moment from "moment";
import React from "react";

export const formatMedicineData = medicine => {
    medicine.price = medicine.price + " ₴"
    medicine.minTemperature = medicine.minTemperature + " °C"
    medicine.maxTemperature = medicine.maxTemperature + " °C"
    medicine.maxHumidity = medicine.maxHumidity + " %"
    medicine.shelfLife = Moment(medicine.shelfLife).format('DD.MM.YYYY')
    return medicine
}

export const formatMedicineStorageData = (storage) => {
    storage.name = storage.name + ' (' + storage.storageForm + ')'
    storage.temperature = storage.temperature + " °C"
    storage.storageConditions = storage.minTemperature + ' — ' + storage.maxTemperature + " °C"
    storage.warehouseAddress = storage.city + ', ' + storage.street + ', ' + storage.house
    storage.placement = storage.placementId + ' - ' + storage.type

    const normal = "Normal"
    const normalStyle = {color: "#009688"}
    const violated = "Violated"
    const violatedStyle = {color: "red"}

    const stringTemperature = storage.temperature;
    const temperature = parseInt(stringTemperature.substring(0, stringTemperature.length - 3))
    const temperatureDoesNotMatch = temperature < storage.minTemperature || temperature > storage.maxTemperature
    storage.isConditionsViolatedTranslate = temperatureDoesNotMatch ? violated : normal
    storage.conditionsStyle = temperatureDoesNotMatch ? violatedStyle : normalStyle

    const isShelfLifeExpired = Moment(storage.shelfLife).isBefore(Moment.now())
    storage.isShelfLifeExpiredTranslate = isShelfLifeExpired ? violated : normal
    storage.shelfLifeStyle = isShelfLifeExpired ? violatedStyle : normalStyle

    storage = formatMedicineData(storage);
    return storage
}

export const sortById = data => {
    return data.sort((current, next) => {
        return current.id - next.id
    })
}
