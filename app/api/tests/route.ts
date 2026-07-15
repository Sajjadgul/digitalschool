import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const subject = searchParams.get('subject');

        const where: any = {};
        if (category) where.category = category;
        if (subject) where.subject = subject;

        const tests = await prisma.test.findMany({
            where,
            include: {
                questions: {
                    include: {
                        options: true
                    },
                    orderBy: { order: 'asc' }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(tests);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
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

        const test = await prisma.test.create({
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
