import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    previousRanks: {
        data: [],
        meta: {}
    },
    filter: {},
    previousRank: {},
}

const previousRankSlice = createSlice({
    name: 'previousRank',
    initialState,
    reducers: {
        getPreviousRanks: (state, action) => {
            state.previousRanks = action.payload
        },
        getPreviousRank: (state, action) => {
            state.previousRank = action.payload
        },
        addPreviousRank: (state, action) => {
            state.previousRanks.data.push(action.payload)
        },
        updatePreviousRank: (state, action) => {
            state.previousRanks.data = state.previousRanks.data.map((previousRank) =>
                previousRank.id === action.payload.id ? action.payload : previousRank
            )
        },
        removePreviousRank: (state, action) => {
            state.previousRanks.data = state.previousRanks.data.filter(
                (previousRank) => previousRank.id !== action.payload
            )
        },
    },
})

export const {
    getPreviousRanks,
    getPreviousRank,
    addPreviousRank,
    updatePreviousRank,
    removePreviousRank,
} = previousRankSlice.actions

export default previousRankSlice.reducer
