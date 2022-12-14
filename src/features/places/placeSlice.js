import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import placeService from './placeService'

import { ERROR_REQUEST_FAILED } from '../../shared/util/default_text'

const initialState = {
  place: null,
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

export const updatePlace = createAsyncThunk('/updatePlaces', async ({postData, placeId}, thunkAPI) => {
  try {
    return await placeService.updatePlace(postData, placeId)
  } catch (error) {
    const payload = {
      message: error.response.data.message || error.message || ERROR_REQUEST_FAILED,
      errors: error.response.data ? error.response.data.errors : []
    }
    return thunkAPI.rejectWithValue(payload)
  }
})

export const deletePlace = createAsyncThunk('/deletePlace', async (placeId, thunkAPI) => {
  try {
    const response = await placeService.deletePlace(placeId).data
    console.log(response)
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
    return await placeService.getPlacesByUser(userId)
  } catch (error) {
    const payload = {
      message: error.response.data.message || error.message || ERROR_REQUEST_FAILED,
      errors: error.response.data ? error.response.data.errors : []
    }
    return thunkAPI.rejectWithValue(payload)
  }
})

export const getPlaceById = createAsyncThunk('/placeByID', async (placeId, thunkAPI) => {
  try {
    return await placeService.getPlaceById(placeId)
  } catch (error) {
    console.log(error)
    const payload = {
      message: error.response.data.message || error.message || ERROR_REQUEST_FAILED,
      errors: error.response.data.errors || []
    }
    console.log(payload)
    return thunkAPI.rejectWithValue(payload)
  }
})


export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetWithData: (state) => {
      state.isError = false
      state.isSuccess = false
      state.errors = []
      state.message = ''
    },
    removePlace: (state, action) => {
      state.places = state.places.filter((place) => place.id !== action.payload.removePlaceId)
    }
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
        state.places = action.payload
      })
      .addCase(getPlacesByUser.rejected, (state, action) => {
        Object.assign(state, initialState)  
        state.isError = true
        state.errors = action.payload.errors
        state.message = action.payload.message
      })
      .addCase(getPlaceById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPlaceById.fulfilled, (state, action) => {
        Object.assign(state, initialState)
        state.isSuccess = true
        state.place = action.payload
      })
      .addCase(getPlaceById.rejected, (state, action) => {
        console.log(state.payload)
        Object.assign(state, initialState)  
        state.isError = true
        state.errors = action.payload.errors
        state.message = action.payload.message
      })
      .addCase(updatePlace.pending, (state) => {
        Object.assign(state, initialState)
        state.isLoading = true
      })
      .addCase(updatePlace.fulfilled, (state, action) => {
        Object.assign(state, initialState)
        state.isSuccess = true
        state.place = action.payload
      })
      .addCase(updatePlace.rejected, (state, action) => {
        Object.assign(state, initialState)  
        state.isError = true
        state.errors = action.payload.errors
        state.message = action.payload.message
      })
      .addCase(deletePlace.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deletePlace.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errors = action.payload.errors
        state.message = action.payload.message
      })
  }
})


export const {reset, resetWithData, removePlace} = placeSlice.actions
export default placeSlice.reducer