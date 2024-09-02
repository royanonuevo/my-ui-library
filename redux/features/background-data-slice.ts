import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchStaticDataStates, fetchStaticDataCountries } from '@/lib/apis/backgroundData'

// Define a type for the slice state
interface stateJobsLocation {
  states: any[]
  countries: any[]
}

const initialState: stateJobsLocation = {
  states: [],
  countries: []
}


export const staticDataSlice = createSlice({
  name: 'staticData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStaticDataStates.fulfilled, (state, action) => {
      state.states = [...action.payload]
    }),
    builder.addCase(fetchStaticDataCountries.fulfilled, (state, action) => {
      state.countries = [...action.payload]
    })
  }
})

// Action creators are generated for each case reducer function
export const { } = staticDataSlice.actions

export default staticDataSlice.reducer