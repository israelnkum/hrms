import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import employeeReducer from './employee-reducer'
import userReducer from './UserReducer'
import commonReducer from "./common-reducer";
import qualificationReducer from "./qualification-reducer";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: [
        employeeReducer,
        userReducer,
        commonReducer,
        qualificationReducer,
    ]
}

const rootReducer = combineReducers({
    employeeReducer,
    userReducer,
    commonReducer,
    qualificationReducer,
})

export default persistReducer(persistConfig, rootReducer)
