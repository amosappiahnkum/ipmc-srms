import { Types } from '../actions/batches/Types'
const initialState = {
    batches: {
        data: [],
        meta: {}
    },
    batch: {},
    filter: {
        program_id: 'all',
        instructor_id: 'all',
        start_date: null,
        end_date: null
    }
}

export default function batchReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_BATCHES:
            return { ...state, batches: action.payload }

        case Types.ADD_BATCH_FILTER:
            return { ...state, filter: action.payload}

        case Types.GET_BATCH:
            return { ...state, batch: action.payload }

        case Types.ADD_BATCH:
            return {
                ...state,
                batches: { ...state.batches, data: state.batches.data.concat(action.payload) }
            }

        case Types.UPDATE_BATCH:
            return {
                ...state,
                batch: action.payload,
                batches: {
                    ...state.batches,
                    data: state.batches.data.map((batch) => {
                        return batch.id === action.payload.id ? action.payload : batch
                    })
                }
            }

        case Types.REMOVE_BATCH:
            return {
                ...state,
                batches: { ...state.batches, data: state.batches.data.filter((batch) => batch.id !== action.id) }
            }

        default:
            return state
    }
}
