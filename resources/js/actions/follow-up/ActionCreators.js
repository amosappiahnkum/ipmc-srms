import { Types } from './Types'

export const getFollowUps = (payload) => {
    return {
        type: Types.GET_FOLLOW_UPS,
        payload: payload
    }
}
export const updateFollowUp = (payload) => {
    return {
        type: Types.UPDATE_FOLLOW_UP,
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
        type: Types.ADD_FOLLOW_UP_FILTER,
        payload: payload
    }
}
