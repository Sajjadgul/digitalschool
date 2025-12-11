"use server"
import prisma from "@/lib/prisma"
import { safeAction } from "@/lib/utils"

export const RegisterUser = safeAction(async (email: string, password: string) => {
    await prisma.user.create({ data: { email, password } })
    return { success: true }
})