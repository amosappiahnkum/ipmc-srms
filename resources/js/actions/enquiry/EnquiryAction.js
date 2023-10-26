import api from '../../utils/api'
import {
    addFeedback,
    addFilter,
    getBatches,
    getEnquires,
    getEnquiryPrograms,
    submitEnquiry,
    updateFeedback
} from './ActionCreators'
import {completeExport} from "../../utils";


/**
 * Display a listing of the resource.
 * @returns {function(*): Promise<unknown>}
 */
export const handleGetEnquiryPrograms = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/enquiry/programs?${params}`).then((res) => {
            dispatch(getEnquiryPrograms(res.data))
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
export const handleGetEnquiryBranches = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/enquiry/branches`).then((res) => {
            dispatch(getBatches(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleSubmitEnquiry = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/enquiry`, data).then((res) => {
            dispatch(submitEnquiry(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleSubmitFeedback = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/feedbacks`, data).then((res) => {
            dispatch(addFeedback(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleUpdateFeedback = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/feedbacks/${data.get('id')}`, data)
            .then((res) => {
                dispatch(updateFeedback(res.data))
                resolve(res)
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetAllEnquiries = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/enquiries?${params}`).then((res) => {
            dispatch(getEnquires(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handlePrintEnquiry = (enquiryId) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/report/enquiry/print/${enquiryId}`, {responseType: 'blob'})
            .then((res) => {
                completeExport(res.data, 'enquiry')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}


export const handleExportEnquiries = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/enquiries?${params}`, {responseType: 'blob'})
            .then((res) => {
                completeExport(res.data, 'ipmc-enquiries' + Date.now())
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}
