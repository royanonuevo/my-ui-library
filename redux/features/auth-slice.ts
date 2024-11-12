import { createSlice } from '@reduxjs/toolkit'

type AuthState = {
  token: string | null
}

const initialState: AuthState = {
  token: null
}

export const authSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { 
  setAuthToken
} = authSlice.actions

export default authSlice.reducer