import { NextRequest, NextResponse } from "next/server";
import jwt_decode from "jwt-decode";
import { DecodedUserT } from "@/redux/slices/user.slice";

export const authUserMiddleware = (
  req: NextRequest,
  res: NextResponse,
  accessToken: string
) => {
  const user: DecodedUserT = jwt_decode(accessToken);
  console.log(user);

  if (user.role != "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
};
