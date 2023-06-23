import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from '../utils/API/loginUser'

const initialState = {
  email: '',
  token: '',
  firstName: '',
  lastName: '',
  id: '',
  isFetching: false,
  isAuthenticated: false,
  isError: false,
  errorMessage: '',
  // isRemenberMe: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: (state) => {
      return {
        ...state,
        isError: false,
        isAuthenticated: false,
        isFetching: false,
      }
    },
    // remembered: (state) => {
    //   return {
    //     ...state,
    //     isRememberMe: true,
    //   }
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          email: payload.email,
          token: payload.token,
          isFetching: false,
          isAuthenticated: true,
        }
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        console.log('payload', payload)
        return {
          ...state,
          isFetching: false,
          isError: true,
          errorMessage: payload.message,
        }
      })
      .addCase(loginUser.pending, (state) => {
        return {
          ...state,
          isFetching: true,
        }
      })
  },
})

export const { clearState, remembered } = userSlice.actions

export const userSelector = (state) => state.user

export default userSlice.reducer
