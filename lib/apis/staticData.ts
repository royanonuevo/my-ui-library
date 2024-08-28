const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/static-data'

export const getStaticDataStates = async () => {
  const url = BASE_URL + '/states'
  return await fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json()
  })
}

export const getStaticDataCountries = async () => {
  const url = BASE_URL + '/countries'
  return await fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json()
  })
}