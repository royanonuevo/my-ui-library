import { prisma } from '@/lib/prismadb'
import { NextResponse } from "next/server"



export const GET = async () => {
  try {
    const todos = await prisma.countries.findMany()
    return NextResponse.json(todos)
  } catch (err) {
    return NextResponse.json({ message: "GET error", err}, { status: 500})
  }
}