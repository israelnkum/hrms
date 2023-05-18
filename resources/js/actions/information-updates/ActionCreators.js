import {Types} from "./Types";

export const getInformationRequests = (payload) => {
    return {
        type: Types.GET_INFORMATION_REQUESTS,
        payload: payload
    }
}

export const getInformationRequest = (payload) => {
    return {
        type: Types.GET_INFORMATION_REQUEST,
        payload: payload
    }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_INFORMATION_REQUEST_FILTER,
        payload: payload
    }
}
