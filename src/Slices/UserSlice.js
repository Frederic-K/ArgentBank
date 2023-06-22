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
        const token = response.data.body.token
        if (isRememberMe !== false) {
          localStorage.setItem('token', token)
          localStorage.setItem('email', email)
        } else {
          sessionStorage.setItem('token', token)
          sessionStorage.setItem('email', email)
        }
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
