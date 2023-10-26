import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import programReducer from './program-reducer'
import userReducer from './UserReducer'
import commonReducer from "./common-reducer";
import studentReducer from "./student-reducer";
import staffReducer from "./staff-reducer";
import batchReducer from "./batch-reducer";
import enquiryReducer from "./enquiry-reducer";
import registrationReducer from "./registration-reducer";
import followUpReducer from "./follow-up-reducer";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: [
        'programReducer',
        'userReducer',
        'commonReducer',
        'studentReducer',
        'staffReducer',
        'batchReducer',
        'enquiryReducer',
        'registrationReducer',
        'followUpReducer'
    ]
}

const rootReducer = combineReducers({
    programReducer,
    userReducer,
    commonReducer,
    studentReducer,
    staffReducer,
    batchReducer,
    enquiryReducer,
    registrationReducer,
    followUpReducer
})

export default persistReducer(persistConfig, rootReducer)
