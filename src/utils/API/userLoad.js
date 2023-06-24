import { createAsyncThunk } from '@reduxjs/toolkit'

export const userLoad = createAsyncThunk(
  'user/load',
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      let data = await response.json()
      console.log('data', data, response.status)

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
