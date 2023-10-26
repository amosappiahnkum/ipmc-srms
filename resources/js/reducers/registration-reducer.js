import {Types} from '../actions/registrations/Types'

const initialState = {
    registrations: {
        data: [],
        meta: {}
    },
    filter: {
        program_id: 'all',
        staff_id: 'all',
        start_date: null,
        end_date: null
    }
}

export default function registrationReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_REGISTRATIONS:
            return {...state, registrations: action.payload}

        case Types.ADD_REGISTRATION_FILTER:
            return {...state, filter: action.payload}

        case Types.UPDATE_REGISTRATION:
            return {
                ...state,
                registrations: {
                    ...state.registrations,
                    data: state.registrations.data.map((registration) => {
                        return registration.id === action.payload.id ? action.payload : registration
                    })
                }
            }
        default:
            return state
    }
}
