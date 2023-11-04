import NextAuth, { RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from 'next-auth';

const requestHeaders: HeadersInit = new Headers();
requestHeaders.append('Content-Type', 'application/json')

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "email-login",
      name: "Credentials",
      credentials: {
        email: { label: "user email", type: "email", placeholder: "user@email.com" },
        password: {  label: "password", type: "password" },
      },
      authorize: async (credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">): Promise<User | null> => {
        try {
          const data = {
            email: credentials?.email,
            password: credentials?.password
          }
          const JSONdata = JSON.stringify(data);
          const options = {
            method: "POST",
            headers: requestHeaders,
            body: JSONdata,
          };
          const res = await fetch(`${process.env.DEFAULT_URL}/auth/login`, options);
          if (res.ok) {
            const accessToken = res.headers.get("Access_Token") || null;
            const refreshToken = res.headers.get("Refresh_Token") || null;
        
            if (accessToken && refreshToken) {
              const user: User = {
                id: '1',
                accessToken,
                refreshToken,
              };
              return Promise.resolve(user);
            }
          }
          // 로그인 실패 처리
          return Promise.reject({message: "아이디나 비밀번호를 확인해주세요!"});
        } catch (error) {
          console.error("error:", error);
          return Promise.reject({message: error});
        }
      }
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
});
