import { FRONTEND_URL } from "@/constants";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: FRONTEND_URL,
  timeout: 5000,
});

export async function axiosCall({
  method,
  url,
  payload,
  params,
}: {
  method: string;
  url: string;
  payload: object | null;
  params?: object | null;
}) {
  try {
    const response: AxiosResponse = await instance.request({
      data: payload,
      url: url,
      params: params,
      method: method,
      withCredentials: true,
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}
