"use client";

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

  console.log(response);
  return <div>Page</div>;
};

export default Page;
