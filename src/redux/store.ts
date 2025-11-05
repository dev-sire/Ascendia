"use client"
import { combineReducers, configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"

// 1. Define a simple, placeholder slice to ensure the store is valid
interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0,
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // Example reducer to increment the counter
        increment: (state) => {
            state.value += 1
        },
        // Example reducer to set the counter value
        setValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        },
    },
})

// Export the reducer and actions from the slice
export const counterReducer = counterSlice.reducer
export const { increment, setValue } = counterSlice.actions


// 2. Add the reducer to combineReducers
const rootReducer = combineReducers({
    counter: counterReducer, // Store is now valid!
    // Add other reducers here as you create them
})

export const store = configureStore({
    reducer: rootReducer,
    // Disabling serializableCheck is generally not recommended, but keeping it
    // here as it was in your original request.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

// 3. Export these type definitions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// This useAppSelector has type definitions added
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector