import api from '../../utils/api'
import {getAllPermissions, getCommonData, getEnrollmentChart,} from './ActionCreators'
import {updateStaff} from "../staff/ActionCreators";

export const handleGetCommonData = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get('/commons').then((res) => {
            dispatch(getCommonData(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetEnrollmentChart = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get('/report/chart/enrollment').then((res) => {
            dispatch(getEnrollmentChart(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetAllPermissions = (staffId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/common/permissions/${staffId}`).then((res) => {
            dispatch(getAllPermissions(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleAssignPermissions = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/common/permissions/assign', data).then((res) => {
            dispatch(updateStaff(res.data.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
