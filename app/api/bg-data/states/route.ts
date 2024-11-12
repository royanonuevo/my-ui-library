import { prisma } from '@/lib/prismadb'
import { NextResponse } from "next/server"



export const GET = async () => {
  // console.log('states123aaaaaaaaaaaaa', prisma.states)

  try {
    const states = await prisma.states.findMany()
    return NextResponse.json(states)
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "GET error", err}, { status: 500})
  }
}