import { Types } from './Types'


export const getInstructors = (payload) => {
    return {
        type: Types.GET_INSTRUCTORS,
        payload: payload
    }
}

export const applySearch = (payload) => {
    return {
        type: Types.APPLY_SEARCH_RESULTS,
        payload: payload
    }
}

export const getInstructor = (payload) => {
    return {
        type: Types.GET_INSTRUCTOR,
        payload: payload
    }
}

export const addInstructor = (payload) => {
    return {
        type: Types.ADD_INSTRUCTOR,
        payload: payload
    }
}

export const removeInstructor = (id) => {
    return {
        type: Types.REMOVE_INSTRUCTOR,
        id: id
    }
}

export const updateInstructor = (payload) => {
    return {
        type: Types.UPDATE_INSTRUCTOR,
        payload: payload
    }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_INSTRUCTOR_FILTER,
        payload: payload
    }
}
