import { Types } from '../actions/employee/job-details/Types'
const initialState = {
    jobDetails: {
        data: [],
        meta: {}
    },
    filter: {},
    jobDetail: {},
}

export default function jobDetailsReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_JOB_DETAILS:
            return { ...state, jobDetails: action.payload }

        case Types.GET_JOB_DETAIL:
            return { ...state, jobDetail: action.payload }

        case Types.ADD_JOB_DETAIL:
            return {
                ...state,
                jobDetails: {
                    ...state.jobDetails,
                    data: state.jobDetails.data.concat(action.payload)
                }
            }

        case Types.UPDATE_JOB_DETAIL:
            return {
                ...state,
                jobDetail: action.payload,
                jobDetails: {
                    ...state.jobDetails,
                    data: state.jobDetails.data.map((jobDetail) => {
                        return jobDetail.id === action.payload.id ? action.payload : jobDetail
                    })
                }
            }

        case Types.REMOVE_JOB_DETAIL:
            return {
                ...state,
                jobDetails: {
                    ...state.jobDetails,
                    data: state.jobDetails.data.filter((jobDetail) => jobDetail.id !== action.id)
                }
            }

        default:
            return state
    }
}
