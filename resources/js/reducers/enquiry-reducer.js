import { Types } from '../actions/enquiry/Types'

const initialState = {
    enquiryPrograms: {},
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
        case Types.GET_ENQUIRY_PROGRAMS:
            return {...state, enquiryPrograms: action.payload}

        case Types.GET_ENQUIRIES:
            return {...state, enquiries: action.payload}

        case Types.ADD_ENQUIRY_FILTER:
            return { ...state, filter: action.payload}

        default:
            return state
    }
}
