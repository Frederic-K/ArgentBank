// API to update user's names

import { createAsyncThunk } from '@reduxjs/toolkit'

export const userUpdate = createAsyncThunk(
  'user/update',
  async ({ token, firstName, lastName }, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            firstName,
            lastName,
          }),
        }
      )
      let data = await response.json()
      console.log('dataUpdate', data, response.status)
      if (response.status === 200) {
        return { ...data }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      console.log('Error', error.response.data)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
