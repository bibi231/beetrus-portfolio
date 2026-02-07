import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "BEETRUS_ADMIN_SYSTEM",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "SYSTEM_ADMIN" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials) return null;

                // Simple environment-based admin check for security and simplicity
                const adminUser = "admin";
                const adminPass = process.env.ADMIN_PASSWORD;

                if (
                    credentials.username === adminUser &&
                    credentials.password === adminPass
                ) {
                    return { id: "1", name: "Beetrus Admin", email: "admin@beetrus.com", role: "ADMIN" };
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminRoute = nextUrl.pathname.startsWith("/admin");

            if (isAdminRoute) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
            }
            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
});
