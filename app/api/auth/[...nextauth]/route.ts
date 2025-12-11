import prisma from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) throw new Error("Missing email or password")

                const user = await prisma.user.findUniqueOrThrow({ where: { email: credentials.email, password: credentials.password } })
                return {
                    id: user.id,
                    email: user.email,
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: { signIn: "/" },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
