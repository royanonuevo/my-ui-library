import appApi from './appApi'

const bgDataApiWithTag = appApi.enhanceEndpoints({addTagTypes: ['BG-DATA']})

export const bgDataApi = bgDataApiWithTag.injectEndpoints({
  endpoints: build => ({
    getBgCountries: build.query<any[], void>({
      query: () => '/bg-data/countries'
    }),
    getBgStates: build.query<any[], void>({
      query: () => '/bg-data/states'
    }),
  })
})
export const { 
  useGetBgStatesQuery,
  useGetBgCountriesQuery
} = bgDataApi