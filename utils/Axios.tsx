import { BASE_URL } from "@/constants";
import { SessionT } from "@/types";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export async function axiosCall({
  method,
  url,
  payload,
  token,
}: {
  method: string;
  url: string;
  payload: object | null;
  token?: SessionT;
}) {
  try {
    const response: AxiosResponse = await instance.request({
      data: payload,
      url: url,
      headers: {
        authorization: token ? `Bearer ${token.token}` : "",
        "x-refresh": token ? `Bearer ${token.refreshToken}` : "",
      },
      method: method,
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}
