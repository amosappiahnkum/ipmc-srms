import { completeExport } from "../../utils";
import api from '../../utils/api'
import {
    addStudent,
    addFilter,
    applySearch,
    getStudent,
    getStudents,
    removeStudent,
    updateStudent, enroll, getMyPrograms, getMyProgramDetail,
} from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param student
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddStudent = (student) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/students', student).then((res) => {
            dispatch(addStudent(res.data))
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
export const handleGetAllStudents = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/students?${params}`).then((res) => {
            dispatch(getStudents(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetMyPrograms = (studentId, params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/students/${studentId}/my-programs?${params}`).then((res) => {
            dispatch(getMyPrograms(res.data))
            // params?.delete('page')
            // params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetMyProgramDetail = (programId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/students/my-programs/${programId}`).then((res) => {
            dispatch(getMyProgramDetail(res.data))
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
export const handleSearchStudents = (query) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/students/search/${query}`).then((res) => {
            dispatch(applySearch(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportStudents = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/students?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'ipmc-students')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handlePrintSingleStudent = (studentId) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/report/print/${studentId}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'students')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSingleStudent = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/students/${id}`).then((res) => {
            dispatch(getStudent(res.data))
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
export const handleUpdateStudent = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/students/${data.get('id')}`, data, {
            // headers: { 'Content-type': 'multipart/student-dashboard-data' }
        }).then((res) => {
            dispatch(updateStudent(res.data))
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
export const handleDeleteStudent = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/students/${id}`).then((res) => {
            dispatch(removeStudent(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleEnrollStudent = (data, studentId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/students/${studentId}/enroll`, data).then((res) => {
            dispatch(enroll(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
