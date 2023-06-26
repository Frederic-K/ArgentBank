import { createSlice } from '@reduxjs/toolkit'
import { userLogin } from '../../services/API/userLogin'
import { userProfile } from '../../services/API/userProfile'

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
  successMessage: '',
  // isRemenberMe: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: (state) => {
      return {
        ...state,
        email: '',
        token: '',
        firstName: '',
        lastName: '',
        // id: '',
        isFetching: false,
        isAuthenticated: false,
        isError: false,
        errorMessage: '',
        successMessage: '',
      }
    },
    logout: (state) => {
      return {
        ...state,
        email: '',
        token: '',
        firstName: '',
        lastName: '',
        // id: '',
        isFetching: false,
        isAuthenticated: false,
        isError: false,
        errorMessage: '',
        successMessage: '',
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
          token: payload.body.token,
          isFetching: false,
          isAuthenticated: true,
          successMessage: payload.message,
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
          email: payload.body.email,
          firstname: payload.body.firstName,
          lastname: payload.body.lastName,
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
