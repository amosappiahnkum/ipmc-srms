import { completeExport } from "../../utils";
import api from '../../utils/api'
import {
    addStaff,
    addFilter,
    applySearch,
    getStaff,
    getStaffs,
    removeStaff,
    updateStaff,
} from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param staff
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddStaff = (staff) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/staff', staff).then((res) => {
            dispatch(addStaff(res.data))
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
export const handleGetAllStaff = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/staff?${params}`).then((res) => {
            dispatch(getStaffs(res.data))
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
export const handleSearchStaff = (query) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/staff/search/${query}`).then((res) => {
            dispatch(applySearch(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportStaffs = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/staff?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'srms-staff')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSingleStaff = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/staff/${id}`).then((res) => {
            dispatch(getStaff(res.data))
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
export const handleUpdateStaff = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/staff/${data.get('id')}`, data, {
            // headers: { 'Content-type': 'multipart/staff-dashboard-data' }
        }).then((res) => {
            dispatch(updateStaff(res.data))
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
export const handleDeleteStaff = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/staff/${id}`).then((res) => {
            dispatch(removeStaff(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
