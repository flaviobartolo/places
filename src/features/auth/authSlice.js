import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'


const loggedUser = JSON.parse(localStorage.getItem('user'))
console.log(loggedUser)

const initialState = {
  user: loggedUser ? loggedUser : null,
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

export const logoutUser = createAsyncThunk('logout/', async (user, ) => {
  console.log('entrou logout slice')
  console.log(initialState)
  console.log(localStorage.getItem('user'))
  await authService.logoutUser()
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
        state.isLoading = true
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errors = action.payload.errors
        state.isSuccess = false
        state.message = action.payload.message
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.isError = true
        state.errors = action.payload.errors
        state.isSuccess = false
        state.message = action.payload.message
      })
      .addCase(logoutUser.fulfilled, (state) => { // this fixes the problem that you couldnt logout after refreshing a page while logged in (because after refreshing a page the initialState has an user defined)
        state.user = null
      })
  }
})

export const {reset} = authSlice.actions
export default authSlice.reducer