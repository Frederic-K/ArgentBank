import { createSlice } from '@reduxjs/toolkit'
import { userLogin } from '../utils/API/userLogin'
import { userProfile } from '../utils/API/userProfile'

const initialState = {
  email: '',
  token: '',
  firstName: '',
  lastName: '',
  // id: '',
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
        // isError: false,
        // isAuthenticated: false,
        // isFetching: false,
        initialState,
      }
    },
    logout: (state) => {
      return {
        ...state,
        initialState,
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
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        return {
          ...state,
          email: payload.email,
          token: payload.token,
          isFetching: false,
          isAuthenticated: true,
        }
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        console.log('payload', payload)
        return {
          ...state,
          isFetching: false,
          isError: true,
          errorMessage: payload.message,
        }
      })
      .addCase(userLogin.pending, (state) => {
        return {
          ...state,
          isFetching: true,
        }
      })
      .addCase(userProfile.fulfilled, (state, { payload }) => {
        return {
          ...state,
          email: payload.email,
          firstname: payload.firstName,
          lastname: payload.lastName,
          // id: payload.id,
          isFetching: false,
          isAuthenticated: true,
        }
      })
      .addCase(userProfile.rejected, (state, { payload }) => {
        console.log('payload', payload)
        return {
          ...state,
          isFetching: false,
          isError: true,
          errorMessage: payload.message,
        }
      })
      .addCase(userProfile.pending, (state) => {
        return {
          ...state,
          isFetching: true,
        }
      })
  },
})

export const { clearState, logout } = userSlice.actions

export const userSelector = (state) => state.user

export default userSlice.reducer
