import { Types } from '../actions/voters/Types'
const initialState = {
    voters: {
        data: [],
        meta: []
    },
    voterStats: [],
    voterResults: [],
    elections: [],
    newVoter: {},
    userData: {},
    electionDetail: [],
    electionResults: [],
    recentVoters: [],
}

export default function voterReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_ALL_VOTERS:
            return { ...state, voters: action.payload }

        case Types.VOTER_STATS:
            return { ...state, voterStats: action.payload }

        case Types.GET_RECENT_VOTERS:
            return { ...state, recentVoters: action.payload }

        case Types.VOTER_RESULTS:
            return { ...state, voterResults: action.payload }

        case Types.GET_ELECTION_RESULTS:
            return { ...state, electionResults: action.payload }

        case Types.GET_VOTER_ELECTIONS:
            return { ...state, elections: action.payload }

        case Types.GET_ELECTION_DETAIL:
            return (
                {
                    ...state,
                    electionDetail: action.payload[1]
                        .filter((detail) => detail.results.length === 0)
                        .map((key, value) => (
                            {
                                id: key.id,
                                title: key.portfolio.name,
                                content: key.portfolio.candidates,
                                results: key.results
                            }
                        ))
                }
            )

        case Types.CAST_VOTE:
            return (
                {
                    ...state,
                    electionDetail: state.electionDetail.map((detail) => {
                        if (detail.id === action.payload.electionPortfolioId) {
                            return { ...detail, results: [action.payload] }
                        }
                        return detail
                    })
                }
            )

        case Types.NEW_VOTER:
            return {
                ...state,
                voters: { ...state.voters, data: state.voters.data.concat(action.payload) }
            }

        case Types.SET_VOTER_DATA:
            return {
                ...state,
                voters: state.voters.map((voter) => {
                    return voter.id === action.payload.id ? action.payload : voter
                })
            }

        case Types.ADD_VOTER_ELECTION:
            return {
                ...state,
                voters: state.voters.map((voter) => {
                    return voter.id === action.payload.id ? action.payload : voter
                })
            }

        case Types.DELETE_VOTER:
            return {
                ...state,
                voters: state.voters.filter((voter) => voter.id !== action.payload)
            }
        default:
            return state
    }
}
