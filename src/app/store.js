import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/users/userSlice'
import authReducer from '../features/auth/authSlice'
import placeReducer from '../features/places/placeSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    places: placeReducer,
  }
})