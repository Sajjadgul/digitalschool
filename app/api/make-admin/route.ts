import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Not logged in" }, { status: 401 });
        }

        const user = await prisma.user.update({
            where: { email: session.user.email },
            data: { isAdmin: true }
        });

        return NextResponse.json({ 
            success: true, 
            message: `${user.email} is now an admin!`,
            user: {
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
