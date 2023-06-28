import { createSlice } from '@reduxjs/toolkit'
import { userLogin } from '../../services/API/userLogin'
import { userProfile } from '../../services/API/userProfile'
import { userUpdate } from '../../services/API/userUpdate'

const initialState = {
  email: '',
  // token: '',
  token: localStorage.getItem('token') ?? null,
  firstName: '',
  lastName: '',
  // id: '',
  isFetching: false,
  isAuthenticated: false,
  isUpdated: false,
  isError: false,
  errorMessage: '',
  successMessage: '',
  // isRememberMe: false,
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
        isUpdated: false,
        isError: false,
        errorMessage: '',
        successMessage: '',
      }
    },
    update: (state) => {
      return {
        ...state,
        isUpdated: false,
      }
    },
    logout: (state) => {
      localStorage.clear()
      return {
        ...state,
        email: '',
        token: '',
        firstName: '',
        lastName: '',
        // id: '',
        isFetching: false,
        isAuthenticated: false,
        isUpdated: false,
        isError: false,
        errorMessage: '',
        successMessage: '',
      }
    },
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
          firstName: payload.body.firstName,
          lastName: payload.body.lastName,
          // id: payload.id,
          isFetching: false,
          isAuthenticated: true,
          successMessage: payload.message,
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
      .addCase(userUpdate.fulfilled, (state, { payload }) => {
        return {
          ...state,
          firstName: payload.body.firstName,
          lastName: payload.body.lastName,
          isFetching: false,
          isUpdated: true,
          successMessage: payload.message,
        }
      })
      .addCase(userUpdate.rejected, (state, { payload }) => {
        console.log('payload', payload)
        return {
          ...state,
          isFetching: false,
          isError: true,
          errorMessage: payload.message,
        }
      })
      .addCase(userUpdate.pending, (state) => {
        return {
          ...state,
          isFetching: true,
        }
      })
  },
})

export const { clearState, update, logout } = userSlice.actions

export const userSelector = (state) => state.user

export default userSlice.reducer
