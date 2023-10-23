import {completeExport} from "../../utils";
import api from '../../utils/api'
import {
    addBatch,
    addFilter,
    applySearch,
    getAllBatches,
    getBatch,
    getBatches,
    removeBatch,
    updateBatch,
} from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param batch
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddBatch = (batch) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/ongoing-programs', batch).then((res) => {
            dispatch(addBatch(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Display a listing of the resource.
 * @returns {function(*): Promise<unknown>}
 */
export const handleGetAllBatches = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/ongoing-programs?${params}`).then((res) => {
            dispatch(getBatches(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Display a listing of the resource.
 * @returns {function(*): Promise<unknown>}
 */
export const handleSearchBatches = (query) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/ongoing-programs/search/${query}`).then((res) => {
            dispatch(applySearch(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportBatches = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/ongoing-programs?${params}`, {responseType: 'blob'})
            .then((res) => {
                completeExport(res.data, 'srms-ongoing-programs')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSingleBatch = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/ongoing-programs/${id}`).then((res) => {
            dispatch(getBatch(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
export const handleGetAllBatch = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/all-batches?${params}`).then((res) => {
            dispatch(getAllBatches(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
/**
 * Update the specified resource in storage.
 * @param data
 * @returns {function(*): Promise<unknown>}
 */
export const handleUpdateBatch = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/ongoing-programs/${data.get('id')}`, data, {
            // headers: { 'Content-type': 'multipart/ongoing-programs-dashboard-data' }
        }).then((res) => {
            dispatch(updateBatch(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Remove the specified resource from storage.
 * @param id
 * @returns {function(*): Promise<unknown>}
 */
export const handleDeleteBatch = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/ongoing-programs/${id}`).then((res) => {
            dispatch(removeBatch(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}


export const handlePrintAttendance = (data) => async () => {
    return new Promise((resolve, reject) => {
        api().post(`/ongoing-programs/attendance`, data, {responseType: 'blob'})
            .then((res) => {
                completeExport(res.data, 'batch')
                resolve()
            }).catch(async (err) => {
            err.response.data['message'] = JSON.parse(await err.response.data.text())?.message
            reject(err)
        })
    })
}
export const handlePrintBatchPlan = (data) => async () => {
    return new Promise((resolve, reject) => {
        api().post(`/ongoing-programs/batch-plan`, data, {responseType: 'blob'})
            .then((res) => {
                completeExport(res.data, 'batch-plan')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}
