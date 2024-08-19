import { prisma } from '@/lib/prismadb'
import { NextResponse, NextRequest } from "next/server"

export const GET = async (request: NextRequest, { params }: any) => {
  try {
    const { id } = params
    const todo = await prisma.todo.findUnique({
      where: {
        id
      }
    })

    if (!todo) {
      return NextResponse.json({ message: "Todo not found"}, { status: 404})
    }

    return NextResponse.json(todo)
  } catch (err) {
    return NextResponse.json({ message: "GET error", err}, { status: 500})
  }
}


export const PATCH = async (request: NextRequest, { params }: any) => {
  try {
    const body = await request.json()
    const { id } = params
    const { title, description } = body
    const updatePost = await prisma.todo.update({
      where: {
        id
      },
      data: {
        title, 
        description
      }
    })

    if (!updatePost) {
      return NextResponse.json({ message: "Todo not found"}, { status: 404})
    }

    return NextResponse.json(updatePost)
  } catch (err) {
    return NextResponse.json({ message: "Update error", err}, { status: 500})
  }
}

export const DELETE = async (request: NextRequest, { params }: any) => {
  try {
    const { id } = params
    await prisma.todo.delete({
      where: {
        id
      }
    })


    return NextResponse.json("Todo has been deleted")
  } catch (err) {
    return NextResponse.json({ message: "DELETE error", err}, { status: 500})
  }
}
