import { Types } from '../actions/enquiry/Types'

const initialState = {
    enquiryPrograms: {},
    branches: [],
    enquiry: {},
    enquiries: {
        data: [],
        meta: {}
    },
    filter: {
        program_id: 'all',
        date: 'null'
    }
}

export default function enquiryReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_BRANCHES:
            return {...state, branches: action.payload}

        case Types.ENQUIRY_DETAIL:
            return {...state, enquiry: action.payload}

        case Types.GET_ENQUIRY_PROGRAMS:
            return {...state, enquiryPrograms: action.payload}

        case Types.GET_ENQUIRIES:
            return {...state, enquiries: action.payload}

        case Types.ADD_ENQUIRY_FILTER:
            return { ...state, filter: action.payload}

        case Types.ADD_FEEDBACK:
            return {
                ...state,
                enquiry: action.payload,
                enquiries: {
                    ...state.enquiries,
                    data: state.enquiries.data.map((enquiry) => {
                        return enquiry.id === action.payload.id ? action.payload : enquiry
                    })
                }
            }

        default:
            return state
    }
}
