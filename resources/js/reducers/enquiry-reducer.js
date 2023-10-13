import { Types } from '../actions/enquiry/Types'

const initialState = {
    enquiryPrograms: {},
    enquiries: {
        data: [],
        meta: {}
    }
}

export default function enquiryReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_ENQUIRY_PROGRAMS:
            return {...state, enquiryPrograms: action.payload}
        case Types.GET_ENQUIRIES:
            return {...state, enquiries: action.payload}
        default:
            return state
    }
}
