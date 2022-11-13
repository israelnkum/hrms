import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import employeeReducer from './employee-reducer'
import userReducer from './UserReducer'
import commonReducer from "./common-reducer";
import qualificationReducer from "./qualification-reducer";
import contactDetailsReducer from "./contact-details-reducer";
import emergencyContactReducer from "./emergency-contact-reducer";
import dependantReducer from "./dependants-reducer";
import jobDetailsReducer from "./job-details-reducer";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: [
        'employeeReducer',
        'userReducer',
        'commonReducer',
        'qualificationReducer',
        'contactDetailsReducer',
        'emergencyContactReducer',
        'dependantReducer',
        'jobDetailsReducer',
    ]
}

const rootReducer = combineReducers({
    employeeReducer,
    userReducer,
    commonReducer,
    qualificationReducer,
    contactDetailsReducer,
    jobDetailsReducer,
    emergencyContactReducer,
    dependantReducer,
})

export default persistReducer(persistConfig, rootReducer)
