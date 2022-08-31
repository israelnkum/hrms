import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import groupReducer from './GroupReducer'
import employeeReducer from './employee-reducer'
import accessTokenReducer from './AccessTokenReducer'
import candidateReducer from './CandidateReducer'
import userReducer from './UserReducer'
import nominationReducer from './NominationReducer'
import voterReducer from './VoterReducer'

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: [
        'groupReducer',
        'employeeReducer',
        'accessTokenReducer',
        'candidateReducer',
        'userReducer',
        'voterReducer',
        'nominationReducer',
    ]
}

const rootReducer = combineReducers({
    groupReducer,
    employeeReducer,
    accessTokenReducer,
    candidateReducer,
    nominationReducer,
    voterReducer,
    userReducer
})

export default persistReducer(persistConfig, rootReducer)
