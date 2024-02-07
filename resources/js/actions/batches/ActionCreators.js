import { Types } from './Types'


export const getBatches = (payload) => {
    return {
        type: Types.GET_BATCHES,
        payload: payload
    }
}

export const getBatchStudents = (payload) => {
    return {
        type: Types.GET_BATCH_STUDENTS,
        payload: payload
    }
}
export const getExams = (payload) => {
    return {
        type: Types.GET_EXAMS,
        payload: payload
    }
}


export const getAllBatches = (payload) => {
    return {
        type: Types.GET_ALL_BATCHES,
        payload: payload
    }
}

export const applySearch = (payload) => {
    return {
        type: Types.APPLY_SEARCH_RESULTS,
        payload: payload
    }
}

export const getBatch = (payload) => {
    return {
        type: Types.GET_BATCH,
        payload: payload
    }
}

export const addBatch = (payload) => {
    return {
        type: Types.ADD_BATCH,
        payload: payload
    }
}

export const scheduleExam = (payload) => {
    return {
        type: Types.SCHEDULE_EXAM,
        payload: payload
    }
}

export const getExamQuestions = (payload) => {
    return {
        type: Types.GET_EXAM_QUESTIONS,
        payload: payload
    }
}

export const submitResult = (payload) => {
    return {
        type: Types.SUBMIT_RESULT,
        payload: payload
    }
}
export const switchQuestion = (payload) => {
    return {
        type: Types.SWITCH_QUESTION,
        payload: payload
    }
}

export const answerQuestion = (payload) => {
    return {
        type: Types.ANSWER_QUESTION,
        payload: payload
    }
}

export const removeBatch = (id) => {
    return {
        type: Types.REMOVE_BATCH,
        id: id
    }
}

export const updateBatch = (payload) => {
    return {
        type: Types.UPDATE_BATCH,
        payload: payload
    }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_BATCH_FILTER,
        payload: payload
    }
}

export const printAttendance = (payload) => {
    return {
        type: Types.PRINT_ATTENDANCE,
        payload: payload
    }
}
