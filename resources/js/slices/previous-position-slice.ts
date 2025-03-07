import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    previousPositions: {
        data: [],
        meta: {}
    },
    filter: {},
    previousPosition: {},
}

const previousPositionSlice = createSlice({
    name: 'previousPosition',
    initialState,
    reducers: {
        getPreviousPositions: (state, action) => {
            state.previousPositions = action.payload
        },
        getPreviousPosition: (state, action) => {
            state.previousPosition = action.payload
        },
        addPreviousPosition: (state, action) => {
            state.previousPositions.data.push(action.payload)
        },
        updatePreviousPosition: (state, action) => {
            state.previousPositions.data = state.previousPositions.data.map((previousPosition) =>
                previousPosition.id === action.payload.id ? action.payload : previousPosition
            )
        },
        removePreviousPosition: (state, action) => {
            state.previousPositions.data = state.previousPositions.data.filter(
                (previousPosition) => previousPosition.id !== action.payload
            )
        },
    },
})

export const {
    getPreviousPositions,
    getPreviousPosition,
    addPreviousPosition,
    updatePreviousPosition,
    removePreviousPosition,
} = previousPositionSlice.actions

export default previousPositionSlice.reducer
