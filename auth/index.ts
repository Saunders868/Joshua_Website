import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosCall } from "@/utils/Axios";
import jwt_decode from "jwt-decode";
import { cookies } from "next/headers";

import {
  ACCESS_COOKIE_TIME,
  REFRESH_COOKIE_TIME,
  SESSIONS_URL,
} from "@/constants";
import { DecodedUserT } from "@/redux/slices/user.slice";

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
      async authorize(credentials) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          const user = await login({ email, password });

          if (user) {
            return user;
          }

          return null;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: REFRESH_COOKIE_TIME,
  },
  callbacks: {
    jwt: async ({
      token,
      user,
      trigger,
      session,
    }: {
      token: any;
      user: any;
      session?: any;
      trigger?: any;
    }) => {
      user && (token.user = user);
      if (trigger === "update" && session) {
        token.user = { ...user, ...session };
      }
      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
