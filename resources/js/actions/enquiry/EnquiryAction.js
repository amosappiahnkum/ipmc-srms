import api from '../../utils/api'
import {getEnquires, getEnquiryPrograms, submitEnquiry} from './ActionCreators'
import {addFilter} from "../students/ActionCreators";
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
        api().get(`/report/enquiry/print/${enquiryId}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'enquiry')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}
