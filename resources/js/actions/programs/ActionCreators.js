import { Types } from './Types'

export const getPrograms = (payload) => {
    return {
        type: Types.GET_PROGRAMS,
        payload: payload
    }
}

export const getAllPrograms = (payload) => {
    return {
        type: Types.GET_ALL_PROGRAMS,
        payload: payload
    }
}

export const applySearch = (payload) => {
    return {
        type: Types.APPLY_SEARCH_RESULTS,
        payload: payload
    }
}

export const getProgram = (payload) => {
    return {
        type: Types.GET_PROGRAM,
        payload: payload
    }
}

export const addProgram = (payload) => {
    return {
        type: Types.ADD_PROGRAM,
        payload: payload
    }
}

export const removeProgram = (id) => {
    return {
        type: Types.REMOVE_PROGRAM,
        id: id
    }
}

export const updateProgram = (payload) => {
    return {
        type: Types.UPDATE_PROGRAM,
        payload: payload
    }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_PROGRAM_FILTER,
        payload: payload
    }
}
