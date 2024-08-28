import { NextResponse } from "next/server"

export const GET = async () => {
  return NextResponse.json([
    { label: 'State 1', value: 'State 1'},
    { label: 'State 2', value: 'State 2'},
    { label: 'State 3', value: 'State 3'}
  ])
}