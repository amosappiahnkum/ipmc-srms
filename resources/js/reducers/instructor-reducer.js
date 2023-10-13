import { Types } from '../actions/instructors/Types'
const initialState = {
    instructors: {
        data: [],
        meta: {}
    },
    instructor: {},
    filter: {
        department_id: 'all',
        rank_id: 'all',
        educational_level_id: 'all',
        job_category_id: 'all'
    }
}

export default function instructorReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_INSTRUCTORS:
            return { ...state, instructors: action.payload }

        case Types.ADD_INSTRUCTOR_FILTER:
            return { ...state, filter: action.payload}

        case Types.GET_INSTRUCTOR:
            return { ...state, instructor: action.payload }

        case Types.ADD_INSTRUCTOR:
            return {
                ...state,
                instructors: { ...state.instructors, data: state.instructors.data.concat(action.payload) }
            }

        case Types.UPDATE_INSTRUCTOR:
            return {
                ...state,
                instructor: action.payload,
                instructors: {
                    ...state.instructors,
                    data: state.instructors.data.map((instructor) => {
                        return instructor.id === action.payload.id ? action.payload : instructor
                    })
                }
            }

        case Types.REMOVE_INSTRUCTOR:
            return {
                ...state,
                instructors: { ...state.instructors, data: state.instructors.data.filter((instructor) => instructor.id !== action.id) }
            }

        default:
            return state
    }
}
