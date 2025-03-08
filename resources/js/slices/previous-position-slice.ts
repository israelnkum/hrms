import {createSlice} from '@reduxjs/toolkit';
import {
    fetchPreviousPositions,
    fetchPreviousPosition,
    addPreviousPosition,
    updatePreviousPosition,
    removePreviousPosition
} from '../services/previous-position.service';
import {PreviousPositionState} from "../types/previous-positions";

const initialState: PreviousPositionState = {
    previousPositions: {
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
    previousPosition: {
        id: 0,
        info_update: undefined
    }
};

const previousPositionSlice = createSlice({
    name: 'previousPosition',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPreviousPositions.fulfilled, (state, action) => {
                state.previousPositions = action.payload;
            })
            .addCase(fetchPreviousPosition.fulfilled, (state, action) => {
                state.previousPosition = action.payload;
            })
            // Add Previous Position
            .addCase(addPreviousPosition.fulfilled, (state, action) => {
                state.previousPositions.data.push(action.payload);
            })

            // Update Previous Position
            .addCase(updatePreviousPosition.fulfilled, (state, action) => {
                state.previousPositions.data = state.previousPositions.data.map((previousPosition) =>
                    previousPosition.id === action.payload.id ? action.payload : previousPosition
                );
            })

            // Remove Previous Position
            .addCase(removePreviousPosition.fulfilled, (state, action) => {
                state.previousPositions.data = state.previousPositions.data.filter(
                    (previousPosition) => previousPosition.id !== action.payload
                );
            });
    }
});

export default previousPositionSlice.reducer;
