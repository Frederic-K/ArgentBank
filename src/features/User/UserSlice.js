import { createSlice } from '@reduxjs/toolkit'
import { userLogin } from '../../services/API/userLogin'
import { userProfile } from '../../services/API/userProfile'
import { userUpdate } from '../../services/API/userUpdate'

// const userToken = localStorage.getItem('token') ?? null

const initialState = {
  email: '',
  // token: '',
  token: localStorage.getItem('token') ?? null,
  firstName: '',
  lastName: '',
  // id: '',
  isFetching: false,
  permission: [],
  isUpdated: false,
  isError: false,
  errorMessage: '',
  successMessage: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // State management from actions
    clearState: (state) => {
      return {
        ...state,
        email: '',
        token: '',
        firstName: '',
        lastName: '',
        // id: '',
        isFetching: false,
        permission: [],
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
        permission: [],
        isUpdated: false,
        isError: false,
        errorMessage: '',
        successMessage: '',
      }
    },
  },
  extraReducers: (builder) => {
    // State management from api feedback
    builder
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        return {
          ...state,
          token: payload.body.token,
          isFetching: false,
          permission: [],
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
          // id: payload.body.id,
          isFetching: false,
          permission: [],
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
          // permission: [],
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
// Actions to manage state
export const { clearState, update, logout } = userSlice.actions
// Grab states
export const userSelector = (state) => state.user

export default userSlice.reducer
