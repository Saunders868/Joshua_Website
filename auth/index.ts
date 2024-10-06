import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosCall } from "@/utils/Axios";
import jwt_decode from "jwt-decode";
import { cookies } from "next/headers";

import { SESSIONS_URL } from "@/constants";
import { DecodedUserT } from "@/redux/slices/user.slice";

const ACCESS_COOKIE_TIME = 360000;
const REFRESH_COOKIE_TIME = 360000 * 2;

const login = async (credentials: { email: string; password: string }) => {
  try {
    const userAccessTokens = await axiosCall({
      method: "POST",
      url: SESSIONS_URL,
      payload: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    if (userAccessTokens == null) {
      throw new Error("Invalid Credentials.");
    }

    const user: DecodedUserT = jwt_decode(userAccessTokens.data.accessToken);

    const userWithToken: DecodedUserT & {
      accessToken: string;
      refreshToken: string;
    } = {
      ...user,
      accessToken: userAccessTokens.data.accessToken,
      refreshToken: userAccessTokens.data.refreshToken,
    };

    cookies().set("accessToken", userWithToken.accessToken, {
      maxAge: ACCESS_COOKIE_TIME,
      httpOnly: true,
      domain: process.env.CORS_DOMAIN || "localhost",
      path: "/",
      sameSite: "strict",
      secure: (process.env.SECURE as unknown as boolean) || false,
    });

    cookies().set("refreshToken", userWithToken.refreshToken, {
      maxAge: REFRESH_COOKIE_TIME,
      httpOnly: true,
      domain: process.env.CORS_DOMAIN || "localhost",
      path: "/",
      sameSite: "strict",
      secure: (process.env.SECURE as unknown as boolean) || false,
    });

    return {
      ...userWithToken,
      id: userWithToken._id as string,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login!");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string }) {
        try {
          const { email, password } = credentials;

          const user = await login({ email, password });

          if (user) {
            return user;
          }

          return {
            message: "Invalid Email or Password",
          };
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: any }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      session.user = token.user;
      return session;
    },
  },
});
