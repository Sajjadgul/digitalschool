import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const test = await prisma.test.findUnique({
            where: { id },
            include: {
                questions: {
                    include: {
                        options: true
                    },
                    orderBy: { order: 'asc' }
                }
            }
        });

        if (!test) {
            return NextResponse.json({ error: "Test not found" }, { status: 404 });
        }

        return NextResponse.json(test);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email! }
        });

        if (!user?.isAdmin) {
            return NextResponse.json({ error: "Admin access required" }, { status: 403 });
        }

        const body = await request.json();
        const { title, description, category, subject, questions } = body;

        await prisma.question.deleteMany({
            where: { testId: id }
        });

        const test = await prisma.test.update({
            where: { id },
            data: {
                title,
                description,
                category,
                subject,
                questions: {
                    create: questions.map((q: any, index: number) => ({
                        questionText: q.questionText,
                        order: q.order || index,
                        lessonVideoUrl: q.lessonVideoUrl || null,
                        options: {
                            create: q.options.map((opt: any, optIndex: number) => ({
                                optionText: opt.optionText,
                                isCorrect: opt.isCorrect,
                                order: optIndex
                            }))
                        }
                    }))
                }
            },
            include: {
                questions: {
                    include: {
                        options: true
                    }
                }
            }
        });

        return NextResponse.json(test);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email! }
        });

        if (!user?.isAdmin) {
            return NextResponse.json({ error: "Admin access required" }, { status: 403 });
        }

        await prisma.test.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Test deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
