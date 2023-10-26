import { Types } from './Types'

export const getRegistrations = (payload) => {
    return {
        type: Types.GET_REGISTRATIONS,
        payload: payload
    }
}
export const updateRegistration = (payload) => {
    return {
        type: Types.UPDATE_REGISTRATION,
        payload: payload
    }
}
export const applySearch = (payload) => {
    return {
        type: Types.APPLY_SEARCH_RESULTS,
        payload: payload
    }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_REGISTRATION_FILTER,
        payload: payload
    }
}
