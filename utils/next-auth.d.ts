import NextAuth from "next-auth";
declare module "next-auth" {
  interface User
    extends DecodedUserT,
      { accessToken: string, refreshToken: string } {}
  interface Session {
    user: DecodedUserT & { accessToken: string; refreshToken: string };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: DecodedUserT & { accessToken: string; refreshToken: string };
  }
}
