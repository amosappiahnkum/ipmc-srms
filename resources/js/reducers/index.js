import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import programReducer from './program-reducer'
import userReducer from './UserReducer'
import commonReducer from "./common-reducer";
import studentReducer from "./student-reducer";
import instructorReducer from "./instructor-reducer";
import batchReducer from "./batch-reducer";
import enquiryReducer from "./enquiry-reducer";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: [
        'programReducer',
        'userReducer',
        'commonReducer',
        'studentReducer',
        'instructorReducer',
        'batchReducer',
        'enquiryReducer'
    ]
}

const rootReducer = combineReducers({
    programReducer,
    userReducer,
    commonReducer,
    studentReducer,
    instructorReducer,
    batchReducer,
    enquiryReducer
})

export default persistReducer(persistConfig, rootReducer)
