import { DEFAULT_URL } from '@/config/index';
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { SessionWithUser } from '@/auth';

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
      authorize: async (credentials) => {
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
        try{
          const res = await fetch(`${DEFAULT_URL}/auth/login`, options);
          if (res.ok) {
            const accessToken = res.headers.get("Access_Token");
            const refreshToken = res.headers.get("Refresh_Token");
      
            return Promise.resolve({ accessToken, refreshToken });
          } else {
            // 로그인 실패 처리
            return Promise.reject({ details: "error", message: "로그인 실패" });
          }
        } catch (error) {
          console.error("error:", error);
          return Promise.reject({ details: "error", message: error });
        }
      },
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
    async signIn(user: any) { 
      if (user && user.user.accessToken) {
        // console.log("엑세스 토큰",user.user.accessToken); // 안전하게 참조 가능
      } else {
        console.error("accessToken is not available.");
      }
      return true;
    },
    async jwt({ user, token }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      // console.log("토큰",token); //<-- output below
      return token;
    },
    async session(session: SessionWithUser) {
      const decodedToken = jwt.decode(session.token.accessToken);
      const expTime = decodedToken?.exp
      session.token.exp = expTime
      session.session.expires = expTime
      return session;
    },
  },
});
