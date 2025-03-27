import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import seasonsReducer from "./features/seasons/seasonsSlice";

const store = configureStore({
  reducer: {
    seasonsReducer,
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export default store