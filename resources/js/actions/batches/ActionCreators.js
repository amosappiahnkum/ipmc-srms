import { Types } from './Types'


export const getBatches = (payload) => {
    return {
        type: Types.GET_BATCHES,
        payload: payload
    }
}

export const applySearch = (payload) => {
    return {
        type: Types.APPLY_SEARCH_RESULTS,
        payload: payload
    }
}

export const getBatch = (payload) => {
    return {
        type: Types.GET_BATCH,
        payload: payload
    }
}

export const addBatch = (payload) => {
    return {
        type: Types.ADD_BATCH,
        payload: payload
    }
}

export const removeBatch = (id) => {
    return {
        type: Types.REMOVE_BATCH,
        id: id
    }
}

export const updateBatch = (payload) => {
    return {
        type: Types.UPDATE_BATCH,
        payload: payload
    }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_BATCH_FILTER,
        payload: payload
    }
}
