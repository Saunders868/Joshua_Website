"use client";

import { BASE_URL } from "@/constants";
import { SessionT } from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export function useAxios({ url, token }: { url: string; token: SessionT }) {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getAreaDetails = async () => {
    try {
      const result = await instance({
        url: url,
        method: "GET",
        headers: {
          authorization: token ? `Bearer ${token.token}` : "",
          "x-refresh": token ? `${token.refreshToken}` : "",
        },
      });
      setResponse(result);
    } catch (err: any) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAreaDetails();
  }, []);

  return {
    response,
    error,
    loading,
  };
}
