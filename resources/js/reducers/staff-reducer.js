import { Types } from '../actions/staff/Types'
const initialState = {
    staffs: {
        data: [],
        meta: {}
    },
    staff: {},
    filter: {
        rank_id: 'all',
    }
}

export default function staffReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_STAFFS:
            return { ...state, staffs: action.payload }

        case Types.ADD_STAFF_FILTER:
            return { ...state, filter: action.payload}

        case Types.GET_STAFF:
            return { ...state, staff: action.payload }

        case Types.ADD_STAFF:
            return {
                ...state,
                staffs: { ...state.staffs, data: state.staffs.data.concat(action.payload) }
            }

        case Types.UPDATE_STAFF:
            return {
                ...state,
                staff: action.payload,
                staffs: {
                    ...state.staffs,
                    data: state.staffs.data.map((staff) => {
                        return staff.id === action.payload.id ? action.payload : staff
                    })
                }
            }

        case Types.REMOVE_STAFF:
            return {
                ...state,
                staffs: { ...state.staffs, data: state.staffs.data.filter((staff) => staff.id !== action.id) }
            }

        default:
            return state
    }
}
