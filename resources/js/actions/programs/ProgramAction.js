import { completeExport } from "../../utils";
import api from '../../utils/api'
import {
    addProgram,
    addFilter,
    applySearch,
    getProgram,
    getPrograms,
    removeProgram,
    updateProgram, getAllPrograms,
} from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param program
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddProgram = (program) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/programs', program).then((res) => {
            dispatch(addProgram(res.data))
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
export const handleGetAllPrograms = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/programs?${params}`).then((res) => {
            dispatch(getPrograms(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * @returns {function(*): Promise<unknown>}
 */
export const handleGetProgramsForSearch = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get('all-programs').then((res) => {
            dispatch(getAllPrograms(res.data))
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
export const handleSearchPrograms = (query) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/programs/search/${query}`).then((res) => {
            dispatch(applySearch(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportPrograms = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/programs?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'srms-programs')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSingleProgram = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/programs/${id}`).then((res) => {
            dispatch(getProgram(res.data))
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
export const handleUpdateProgram = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/programs/${data.get('id')}`, data, {
            // headers: { 'Content-type': 'multipart/programs-dashboard-data' }
        }).then((res) => {
            dispatch(updateProgram(res.data))
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
export const handleDeleteProgram = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/programs/${id}`).then((res) => {
            dispatch(removeProgram(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
