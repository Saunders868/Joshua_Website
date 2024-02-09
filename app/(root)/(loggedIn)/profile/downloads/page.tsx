"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { USERS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";
import React from "react";

const Page = () => {
  const user = useAppSelector((state) => state.user.user);

  const { response, error, loading } = useAxios({
    url: `${USERS_URL}/${user.id}`,
    token: {
      token: user.token,
      refreshToken: user.refreshToken,
    },
  });

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <div>
      {response?.data.productPermissions.length > 0 ? (
        <p>Your downloads go here...</p>
      ) : (
        <p>You have no downloads as yet...</p>
      )}
    </div>
  );
};

export default Page;
