import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  user: {},
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getUsers = createAsyncThunk('users/', async (_, thunkAPI) => {
  try {
    return await userService.getUsers()
  } catch(error) {
    const message = 'Something went wrong.'
    return thunkAPI.rejectWithValue(message)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        console.log('entrou pending')
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        console.log('entrou fulfilled')
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        console.log('entrou rejected')
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
  }
})

export const {reset} = userSlice.actions
export default userSlice.reducer