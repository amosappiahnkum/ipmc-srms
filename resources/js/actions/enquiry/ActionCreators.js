import { Types } from './Types'


export const getEnquiryPrograms = (payload) => {
    return {
        type: Types.GET_ENQUIRY_PROGRAMS,
        payload: payload
    }
}

export const addFeedback = (payload) => {
    return {
        type: Types.ADD_FEEDBACK,
        payload: payload
    }
}

export const updateFeedback = (payload) => {
    return {
        type: Types.ENQUIRY_DETAIL,
        payload: payload
    }
}

export const getBatches = (payload) => {
    return {
        type: Types.GET_BRANCHES,
        payload: payload
    }
}

export const submitEnquiry = (payload) => {
    return {
        type: Types.SUBMIT_ENQUIRY,
        payload: payload
    }
}


export const getEnquires = (payload) => {
    return {
        type: Types.GET_ENQUIRIES,
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
        type: Types.ADD_ENQUIRY_FILTER,
        payload: payload
    }
}
