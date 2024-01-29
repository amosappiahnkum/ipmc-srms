import { Types } from '../actions/students/Types'
const initialState = {
    students: {
        data: [],
        meta: {}
    },
    myPrograms: {
        data: [],
        meta: {}
    },
    student: {},
    programDetail: {},
    exam: {
        module: {}
    },
    filter: {
        program_id: 'all',
        status: 'in-school',
        search: ''
    }
}

export default function studentReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_STUDENTS:
            return { ...state, students: action.payload }

        case Types.TAKE_EXAM:
            return {
                ...state,
                exam: { ...state.exam, module: action.payload }
            }

        case Types.MY_PROGRAMS:
            return { ...state, myPrograms: action.payload }

        case Types.MY_PROGRAM_DETAIL:
            return { ...state, programDetail: action.payload }

        case Types.ADD_STUDENT_FILTER:
            return { ...state, filter: action.payload}

        case Types.GET_STUDENT:
            return { ...state, student: action.payload }

        case Types.ADD_STUDENT:
            return {
                ...state,
                students: { ...state.students, data: state.students.data.concat(action.payload) }
            }

        case Types.UPDATE_STUDENT:
            return {
                ...state,
                student: action.payload,
                students: {
                    ...state.students,
                    data: state.students.data.map((student) => {
                        return student.id === action.payload.id ? action.payload : student
                    })
                }
            }

        case Types.REMOVE_STUDENT:
            return {
                ...state,
                students: { ...state.students, data: state.students.data.filter((student) => student.id !== action.id) }
            }

        default:
            return state
    }
}
