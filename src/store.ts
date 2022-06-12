import { configureStore } from '@reduxjs/toolkit'
import vehicleSlice from './slices/vehicleSlice'
import partsSlice from './slices/partsSlice'
import addPartSlice from './slices/addPartSlice'

export const store = configureStore({
  reducer: {
    vehicle: vehicleSlice,
    parts: partsSlice,
    addPart: addPartSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch