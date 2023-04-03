import { Types } from '../actions/employee/direct-reports/Types'
const initialState = {
    directReports: {
        data: [],
        meta: {}
    },
    filter: {},
    directReport: {},
}

export default function directReportReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_DIRECT_REPORTS:
            return { ...state, directReports: action.payload }

        case Types.GET_DIRECT_REPORT:
            return { ...state, directReport: action.payload }

        case Types.ADD_DIRECT_REPORT:
            return {
                ...state,
                directReports: {
                    ...state.directReports,
                    data: state.directReports.data.concat(action.payload)
                }
            }

        case Types.UPDATE_DIRECT_REPORT:
            return {
                ...state,
                directReports: {
                    ...state.directReports,
                    data: state.directReports.data.map((directReport) => {
                        return directReport.id === action.payload.id ? action.payload : directReport
                    })
                }
            }

        case Types.REMOVE_DIRECT_REPORT:
            return {
                ...state,
                directReports: { ...state.directReports, data: state.directReports.data.filter((directReport) => directReport.id !== action.id) }
            }

        default:
            return state
    }
}
