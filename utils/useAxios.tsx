"use client";

import { FRONTEND_URL } from "@/constants";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const instance = axios.create({
  withCredentials: true,
  baseURL: FRONTEND_URL,
  timeout: 5000,
});

export function useAxios({ url }: { url: string }) {
  const session = useSession();
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getAreaDetails = async () => {
    try {
      const result = await instance({
        url: url,
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization:
            session.status == "authenticated"
              ? session.data.user.accessToken
              : "",
          "x-refresh":
            session.status == "authenticated"
              ? session.data.user.refreshToken
              : "",
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
