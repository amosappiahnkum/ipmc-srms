import { completeExport } from "../../utils";
import api from '../../utils/api'
import {
    addInstructor,
    addFilter,
    applySearch,
    getInstructor,
    getInstructors,
    removeInstructor,
    updateInstructor,
} from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param instructor
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddInstructor = (instructor) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/instructors', instructor).then((res) => {
            dispatch(addInstructor(res.data))
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
export const handleGetAllInstructors = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/instructors?${params}`).then((res) => {
            dispatch(getInstructors(res.data))
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
export const handleSearchInstructors = (query) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/instructors/search/${query}`).then((res) => {
            dispatch(applySearch(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportInstructors = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/instructors?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'srms-instructors')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSingleInstructor = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/instructors/${id}`).then((res) => {
            dispatch(getInstructor(res.data))
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
export const handleUpdateInstructor = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/instructors/${data.get('id')}`, data, {
            // headers: { 'Content-type': 'multipart/instructors-dashboard-data' }
        }).then((res) => {
            dispatch(updateInstructor(res.data))
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
export const handleDeleteInstructor = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/instructors/${id}`).then((res) => {
            dispatch(removeInstructor(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
