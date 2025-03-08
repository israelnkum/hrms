import {createSlice} from '@reduxjs/toolkit';
import {
    fetchPreviousRanks,
    fetchPreviousRank,
    addPreviousRank,
    updatePreviousRank,
    removePreviousRank
} from '../services/previous-rank.service';
import {PreviousRankState} from "../types/previous-ranks";

const initialState: PreviousRankState = {
    previousRanks: {
        data: [],
        meta: {
            pageCount: 0,
            currentPage: 0,
            total: 0,
            from: 0,
            links: {
                first: "",
                last: "",
                next: null,
                prev: null
            }
        }
    },
    previousRank: {
        id: 0,
        info_update: undefined
    }
};

const previousRankSlice = createSlice({
    name: 'previousRank',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPreviousRanks.fulfilled, (state, action) => {
            state.previousRanks = action.payload;
        }).addCase(fetchPreviousRank.fulfilled, (state, action) => {
            state.previousRank = action.payload;
        }).addCase(addPreviousRank.fulfilled, (state, action) => {
            state.previousRanks.data.push(action.payload);
        }).addCase(updatePreviousRank.fulfilled, (state, action) => {
            state.previousRanks.data = state.previousRanks.data.map((previousRank) =>
                previousRank.id === action.payload.id ? action.payload : previousRank
            );
        }).addCase(removePreviousRank.fulfilled, (state, action) => {
            state.previousRanks.data = state.previousRanks.data.filter(
                (previousRank) => previousRank.id !== action.payload
            );
        });
    }
});

export default previousRankSlice.reducer;
