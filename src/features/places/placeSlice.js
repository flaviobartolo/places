import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import placeService from './placeService'


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
  await placeService.createPlace(postData)
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
        state = initialState
        state.isSuccess = true
        state.place = action.payload
      })
      .addCase(createPlace.rejected, (state, action) => {
        state = initialState
        state.isError = true
        state.errors = action.payload.errors
        state.message = action.payload.message
      })
  }
})


export const {reset} = placeSlice.actions
export default placeSlice.reducer