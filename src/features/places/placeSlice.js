import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import placeService from './placeService'

import { ERROR_REQUEST_FAILED } from '../../shared/util/default_text'

const initialState = {
  place: {},
  places: [],
  isError: false,
  errors: [],
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const createPlace = createAsyncThunk('/places', async (postData, thunkAPI) => {
  try {
    return await placeService.createPlace(postData)
  } catch (error) {
    const payload = {
      message: error.response.data.message || error.message || ERROR_REQUEST_FAILED,
      errors: error.response.data ? error.response.data.errors : []
    }
    return thunkAPI.rejectWithValue(payload)
  }
})

export const getPlacesByUser = createAsyncThunk('/user/places', async (userId, thunkAPI) => {
  try {
    console.log(userId)
    return await placeService.getPlacesByUser(userId)
  } catch (error) {
    console.log(error)
    const payload = {
      message: error.response.data.message || error.message || ERROR_REQUEST_FAILED,
      errors: error.response.data ? error.response.data.errors : []
    }
    return thunkAPI.rejectWithValue(payload)
  }
})


export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlace.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPlace.fulfilled, (state, action) => {
        Object.assign(state, initialState) // set the current state equal to the inital state
        state.isSuccess = true
        state.place = action.payload
      })
      .addCase(createPlace.rejected, (state, action) => {
        Object.assign(state, initialState)  
        state.isError = true
        state.errors = action.payload.errors
        state.message = action.payload.message
      })
      .addCase(getPlacesByUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPlacesByUser.fulfilled, (state, action) => {
        Object.assign(state, initialState)
        state.isSuccess = true
        state.places = action.payload
      })
      .addCase(getPlacesByUser.rejected, (state, action) => {
        Object.assign(state, initialState)  
        state.isError = true
        state.errors = action.payload.errors
        state.message = action.payload.message
      })
  }
})


export const {reset} = placeSlice.actions
export default placeSlice.reducer