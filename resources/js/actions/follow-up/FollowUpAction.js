import api from '../../utils/api'
import {addFilter, getFollowUps, updateFollowUp} from './ActionCreators'
import {completeExport} from "../../utils";

export const handleGetAllFollowUps = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/feedbacks?${params}`).then((res) => {
            dispatch(getFollowUps(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handlePrintFollowUp = (enquiryId) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/report/feedbacks/print/${enquiryId}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'enquiry')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}


export const handleExportFollowUps = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/feedbacks?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'ipmc-feedbacks' + Date.now())
                resolve()
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
export const handleUpdateFollowUp = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        data._method =  "PUT"
        api().post(`/feedbacks/${data.id}`, data)
            .then((res) => {
            dispatch(updateFollowUp(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
