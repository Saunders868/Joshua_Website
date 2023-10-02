"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosCall } from "@/utils/Axios";
import { SESSIONS_URL } from "@/constants";
import { logout } from "@/redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Button = ({
  link,
  text,
  fill,
  light,
}: {
  link: string;
  text: string;
  fill?: boolean;
  light?: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const userData = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const logOutServer = async () => {
    setLoading(true);
    const response = await axiosCall({
      method: "delete",
      url: SESSIONS_URL,
      payload: null,
      token: {
        token: userData.token,
        refreshToken: userData.refreshToken,
      },
    });

    await dispatch(logout());
    setLoading(false);

    push("/");
  };

  if (loading) return "Loading...";

  return (
    <Link
      className={`btn ${fill ? "fill" : ""} ${light ? "light" : ""}`}
      href={link === "sign-out" ? "/" : link}
      onClick={link === "sign-out" ? logOutServer : ()=>{}}
    >
      {text}
    </Link>
  );
};

export default Button;
