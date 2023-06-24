import { createAsyncThunk } from '@reduxjs/toolkit'

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, thunkAPI) => {
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
