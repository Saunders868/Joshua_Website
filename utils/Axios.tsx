import { BASE_URL } from "@/constants";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export async function axiosCall({
  method,
  url,
  payload,
}: {
  method: string;
  url: string;
  payload: object | null;
}) {
  // token?: sessionType,

  try {
    const response: AxiosResponse = await instance.request({
      data: payload,
      url: url,
      // headers: {
      //   authorization: token.accessToken,
      //   "x-refresh": token.refreshToken,
      // },
      method: method,
    });

    return response;
    // add notification
  } catch (error: any) {
    return error.response;
  }

  return;
}
