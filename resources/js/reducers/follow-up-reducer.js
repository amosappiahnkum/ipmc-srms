import {Types} from '../actions/follow-up/Types'

const initialState = {
    followUps: {
        data: [],
        meta: {}
    },
    filter: {
        program_id: 'all',
        date: 'null'
    }
}

export default function followUpReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_FOLLOW_UPS:
            return {...state, followUps: action.payload}

        case Types.ADD_FOLLOW_UP_FILTER:
            return {...state, filter: action.payload}

        case Types.UPDATE_FOLLOW_UP:
            return {
                ...state,
                followUps: {
                    ...state.followUps,
                    data: state.followUps.data.map((follow) => {
                        return follow.id === action.payload.id ? action.payload : follow
                    })
                }
            }
        default:
            return state
    }
}
