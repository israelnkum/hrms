import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import communityServiceReducer from "./community-service-reducer";
import directReportReducer from "./direct-report-reducer";
import employeeReducer from './employee-reducer'
import leaveManagementReducer from "./leave-management-reducer";
import leaveTypesReducer from "./leave-types-reducer";
import nextOfKinsReducer from "./next-of-kin-reducer";
import peopleReducer from "./people-reducer";
import previousPositionReducer from "./previous-position-reducer";
import previousRankReducer from "./previous-rank-reducer";
import timeOffReducer from "./time-off-reducer";
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
        'peopleReducer',
        'leaveTypesReducer',
        'leaveManagementReducer',
        'userReducer',
        'commonReducer',
        'qualificationReducer',
        'contactDetailsReducer',
        'emergencyContactReducer',
        'dependantReducer',
        'jobDetailsReducer',
        'timeOffReducer',
        'directReportReducer',
        'communityServiceReducer',
        'previousPositionReducer',
        'previousRankReducer',
        'nextOfKinsReducer'
    ]
}

const rootReducer = combineReducers({
    employeeReducer,
    peopleReducer,
    leaveTypesReducer,
    leaveManagementReducer,
    userReducer,
    commonReducer,
    qualificationReducer,
    contactDetailsReducer,
    jobDetailsReducer,
    emergencyContactReducer,
    dependantReducer,
    timeOffReducer,
    directReportReducer,
    communityServiceReducer,
    previousPositionReducer,
    previousRankReducer,
    nextOfKinsReducer
})

export default persistReducer(persistConfig, rootReducer)
