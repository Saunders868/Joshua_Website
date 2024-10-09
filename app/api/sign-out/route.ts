import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");

  return new Response();
}
