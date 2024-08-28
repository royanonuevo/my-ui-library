import { NextResponse } from "next/server"

export const GET = async () => {
  return NextResponse.json([
    { label: 'Country 1', value: 'Country 1'},
    { label: 'Country 2', value: 'Country 2'},
    { label: 'Country 3', value: 'Country 3'}
  ])
}