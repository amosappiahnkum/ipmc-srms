import { Types } from './Types'


export const getStudents = (payload) => {
    return {
        type: Types.GET_STUDENTS,
        payload: payload
    }
}

export const applySearch = (payload) => {
    return {
        type: Types.APPLY_SEARCH_RESULTS,
        payload: payload
    }
}

export const getStudent = (payload) => {
    return {
        type: Types.GET_STUDENT,
        payload: payload
    }
}

export const addStudent = (payload) => {
    return {
        type: Types.ADD_STUDENT,
        payload: payload
    }
}

export const removeStudent = (id) => {
    return {
        type: Types.REMOVE_STUDENT,
        id: id
    }
}

export const updateStudent = (payload) => {
    return {
        type: Types.UPDATE_STUDENT,
        payload: payload
    }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_STUDENT_FILTER,
        payload: payload
    }
}

export const enroll = (payload) => {
    return {
        type: Types.ENROLL,
        payload: payload
    }
}
