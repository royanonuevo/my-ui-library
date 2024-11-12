import { createSlice } from '@reduxjs/toolkit'
// import { fetchStaticDataStates, fetchStaticDataCountries } from '@/lib/apis/backgroundData'
import { bgDataApi } from '@/redux/apis/bg-data'

// Define a type for the slice state
interface stateJobsLocation {
  states: any[]
  countries: any[]
}

const initialState: stateJobsLocation = {
  states: [],
  countries: []
}


export const bgDataSlice = createSlice({
  name: 'staticData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(fetchStaticDataStates.fulfilled, (state, action) => {
    //   state.states = [...action.payload]
    // }),
    // builder.addCase(fetchStaticDataCountries.fulfilled, (state, action) => {
    //   state.countries = [...action.payload]
    // })
    builder.addMatcher(bgDataApi.endpoints.getBgCountries.matchFulfilled, (state, action) => {
      console.log('bgData countries...')
      state.countries = action.payload
    })
    builder.addMatcher(bgDataApi.endpoints.getBgStates.matchFulfilled, (state, action) => {
      console.log('bgData states...')
      state.states = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { } = bgDataSlice.actions

export default bgDataSlice.reducer