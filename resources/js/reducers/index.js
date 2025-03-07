import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'

// Import slices instead of reducers
import communityServiceSlice from "../slices/community-service-slice";
import directReportSlice from "../slices/direct-report-slice";
import employeeSlice from '../slices/employee-slice'
import leaveManagementSlice from "../slices/leave-management-slice";
import leaveTypesSlice from "../slices/leave-types-slice";
import nextOfKinsSlice from "../slices/next-of-kin-slice";
import notificationsSlice from "../slices/notifications-slice";
import peopleSlice from "../slices/people-slice";
import previousPositionSlice from "../slices/previous-position-slice";
import previousRankSlice from "../slices/previous-rank-slice";
import timeOffSlice from "../slices/time-off-slice";
import userSlice from '../slices/user-slice'
import commonSlice from "../slices/common-slice";
import qualificationSlice from "../slices/qualification-slice";
import contactDetailsSlice from "../slices/contact-details-slice";
import emergencyContactSlice from "../slices/emergency-contact-slice";
import dependantSlice from "../slices/dependants-slice";
import jobDetailsSlice from "../slices/job-details-slice";
import informationUpdateSlice from "../slices/information-update-slice";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: [
        'employee',
        'people',
        'leaveTypes',
        'leaveManagement',
        'user',
        'common',
        'qualification',
        'contactDetails',
        'emergencyContact',
        'dependant',
        'jobDetails',
        'timeOff',
        'directReport',
        'communityService',
        'previousPosition',
        'previousRank',
        'nextOfKins',
        'notifications',
        'informationUpdate'
    ]
}

const rootReducer = combineReducers({
    employee: employeeSlice,
    people: peopleSlice,
    leaveTypes: leaveTypesSlice,
    leaveManagement: leaveManagementSlice,
    user: userSlice,
    common: commonSlice,
    qualification: qualificationSlice,
    contactDetails: contactDetailsSlice,
    jobDetails: jobDetailsSlice,
    emergencyContact: emergencyContactSlice,
    dependant: dependantSlice,
    timeOff: timeOffSlice,
    directReport: directReportSlice,
    communityService: communityServiceSlice,
    previousPosition: previousPositionSlice,
    previousRank: previousRankSlice,
    nextOfKins: nextOfKinsSlice,
    notifications: notificationsSlice,
    informationUpdate: informationUpdateSlice
})

export default persistReducer(persistConfig, rootReducer)
