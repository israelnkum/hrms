import { Types } from '../actions/candidates/Types'
const initialState = {
    candidates: [],
    newCandidate: {},
    candidateData: {},
    candidateDetail: {},
    candidateToken: {},
    electionData: {},
}

export default function candidateReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_ALL_CANDIDATES:
            return { ...state, candidates: action.payload }

        case Types.GET_ELECTION_CANDIDATES:
            return { ...state, electionData: action.payload }

        case Types.NEW_CANDIDATE:
            return { ...state, candidates: state.candidates.concat(action.payload) }

        case Types.SET_CANDIDATE_DATA:
            return {
                ...state,
                candidates: state.candidates.map((candidate) => {
                    return candidate.id === action.payload.id ? action.payload : candidate
                })
            }

        case Types.GET_CANDIDATE_TOKEN:
            return { ...state, candidateToken: action.payload }

        case Types.GET_CANDIDATE_DETAIL:
            return { ...state, candidateDetail: action.payload }

        default:
            return state
    }
}
