import { Types } from '../actions/programs/Types'
const initialState = {
    programs: {
        data: [],
        meta: {}
    },
    program: {},
    filter: {
        department_id: 'all',
        rank_id: 'all',
        educational_level_id: 'all',
        job_category_id: 'all'
    }
}

export default function programReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_PROGRAMS:
            return { ...state, programs: action.payload }

        case Types.ADD_PROGRAM_FILTER:
            return { ...state, filter: action.payload}

        case Types.GET_PROGRAM:
            return { ...state, program: action.payload }

        case Types.ADD_PROGRAM:
            return {
                ...state,
                programs: { ...state.programs, data: state.programs.data.concat(action.payload) }
            }

        case Types.UPDATE_PROGRAM:
            return {
                ...state,
                program: action.payload,
                programs: {
                    ...state.programs,
                    data: state.programs.data.map((program) => {
                        return program.id === action.payload.id ? action.payload : program
                    })
                }
            }

        case Types.REMOVE_PROGRAM:
            return {
                ...state,
                programs: { ...state.programs, data: state.programs.data.filter((program) => program.id !== action.id) }
            }

        default:
            return state
    }
}
