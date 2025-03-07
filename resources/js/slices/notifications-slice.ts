import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notificationNavs: [],
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        getNotificationNavs: (state, action) => {
            state.notificationNavs = action.payload
        },
    },
})

export const { getNotificationNavs } = notificationsSlice.actions

export default notificationsSlice.reducer
