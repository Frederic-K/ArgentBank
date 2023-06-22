import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password, isRememberMe }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      let data = await response.json()

      console.log('response', data)

      if (response.status === 200) {
        // const token = response.data.body.token
        // if (isRememberMe !== false) {
        //   localStorage.setItem('token', token)
        //   localStorage.setItem('email', email)
        // } else {
        //   sessionStorage.setItem('token', token)
        //   sessionStorage.setItem('email', email)
        // }
        localStorage.setItem('token', data.token)
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      console.log('Error', error.response.data)

      thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
const initialState = {
  email: '',
  token: '',
  firstName: '',
  lastName: '',
  id: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
}

export const userSlice = createSlice({
  name: 'user',

  reducers: {
    clearState: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isFetching = false

      return state
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      console.log('payload', payload)
      state.isFetching = false
      state.isSuccess = true
      state.email = payload.user.email
      state.username = payload.user.name
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.isError = true
      state.errorMessage = payload.message
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.email
      state.username = payload.name
      state.isFetching = false
      state.isSuccess = true
      return state
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log('payload', payload)
      state.isFetching = false
      state.isError = true
      state.errorMessage = payload.message
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true
    },
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.isSuccess = true

      state.email = payload.email
      state.username = payload.name
    },
    [fetchUserBytoken.rejected]: (state) => {
      console.log('fetchUserBytoken')
      state.isFetching = false
      state.isError = true
    },
  },
})

export const { clearState } = userSlice.actions

export const userSelector = (state) => state.user
