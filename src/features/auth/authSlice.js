import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
  user: {},
  isError: false,
  errors: [],
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createUser = createAsyncThunk('signup/', async (postData, thunkAPI) => {
  try {
    const response = await authService.createUser(postData)
    return response
/*     
    if (!response.ok) {
      console.log(response.data)
      return thunkAPI.rejectWithValue(response.data.message)
    }
    return thunkAPI.fulfillWithValue(response.data) */
  } catch (error) {
    console.log(error)
    const payload = {
      message: error.response.data.message || error.message || 'Something went wrong.',
      errors: error.response.data ? error.response.data.errors : []
    }
    return thunkAPI.rejectWithValue(payload)
  }
})

export const loginUser = createAsyncThunk('login/', async (postData, thunkAPI) => {
  try {
    const response = await authService.loginUser(postData)
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
    const payload = {
      message: error.response.data.message || error.message || 'Something went wrong.',
      errors: error.response.data ? error.response.data.errors : []
    }
    return thunkAPI.rejectWithValue(payload)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        console.log('entrou pending')
        state.isLoading = true
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log('entrou fulfilled')
        console.log(action.payload)
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
      })
      .addCase(createUser.rejected, (state, action) => {
        console.log('entrou rejected')
        state.isLoading = false
        state.isError = true
        state.errors = action.payload.errors
        state.isSuccess = false
        state.message = action.payload.message
      })
      .addCase(loginUser.pending, (state) => {
        console.log('entrou pending')
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('entrou fulfilled')
        console.log(action.payload)
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('entrou rejected')
        console.log(action.payload)
        state.isLoading = false
        state.isError = true
        state.errors = action.payload.errors
        state.isSuccess = false
        state.message = action.payload.message
      })
  }
})

export const {reset} = authSlice.actions
export default authSlice.reducer