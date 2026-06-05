"use server"

import { prismaClient } from "@/lib/prismaClient"
import { currentUser } from "@clerk/nextjs/server"

export async function onAuthenticateUser() {
  try {
    const user = await currentUser()
    if (!user) {
      return {
        status: 403
      }
    }

    const userExists = await prismaClient.user.findUnique({
        where: {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: user.firstName + " " + user.lastName
        }
    })

    if (!userExists) {
        return {
            status: 500
        }
    }

    return {
        status: 201
    }

  } catch (error) {
    
    return {
        status: 500
    }

  }
}