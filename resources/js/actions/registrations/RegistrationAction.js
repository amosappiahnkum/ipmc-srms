import api from '../../utils/api'
import {addFilter, getRegistrations, updateRegistration} from './ActionCreators'
import {completeExport} from "../../utils";

export const handleGetAllRegistrations = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/registrations?${params}`).then((res) => {
            dispatch(getRegistrations(res.data))
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
        api().get(`/report/enquiry/print/${enquiryId}`, { responseType: 'blob' })
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
        api().get(`/enquiries?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'ipmc-enquiries' + Date.now())
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
export const handleUpdateRegistration = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        data._method =  "PUT"
        api().post(`/registrations/${data.id}`, data)
            .then((res) => {
            dispatch(updateRegistration(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
