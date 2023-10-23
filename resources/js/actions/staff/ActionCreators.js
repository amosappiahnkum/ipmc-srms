import { Types } from './Types'


export const getStaffs = (payload) => {
    return {
        type: Types.GET_STAFFS,
        payload: payload
    }
}

export const applySearch = (payload) => {
    return {
        type: Types.APPLY_SEARCH_RESULTS,
        payload: payload
    }
}

export const getStaff = (payload) => {
    return {
        type: Types.GET_STAFF,
        payload: payload
    }
}

export const addStaff = (payload) => {
    return {
        type: Types.ADD_STAFF,
        payload: payload
    }
}

export const removeStaff = (id) => {
    return {
        type: Types.REMOVE_STAFF,
        id: id
    }
}

export const updateStaff = (payload) => {
    return {
        type: Types.UPDATE_STAFF,
        payload: payload
    }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_STAFF_FILTER,
        payload: payload
    }
}
