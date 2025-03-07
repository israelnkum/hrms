import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import rootReducer from '../reducers'

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore persist actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})

// window.store = Store

export const persistor = persistStore(Store)

export type RootState = ReturnType<typeof Store.getState>

export type AppDispatch = typeof Store.dispatch
export default { Store, persistor }
