import { prisma } from '@/lib/prismadb'
import { NextResponse, NextRequest } from "next/server"


export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()
    const { title, description } = body
    const newPost = await prisma.todo.create({
      data: {
        title, 
        description
      }
    })

    return NextResponse.json(newPost)
  } catch (err) {
    return NextResponse.json({ message: "POST error", err}, { status: 500})
  }
}

export const GET = async () => {
  try {
    const todos = await prisma.todo.findMany()
    return NextResponse.json(todos)
  } catch (err) {
    return NextResponse.json({ message: "GET error", err}, { status: 500})
  }
}