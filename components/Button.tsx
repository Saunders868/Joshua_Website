"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosCall } from "@/utils/Axios";
import { USERS_URL } from "@/constants";
import { logout } from "@/redux/slices/user.slice";
import { useAppDispatch } from "@/redux/hooks";

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
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const logOutServer = async () => {
    const response = await axiosCall({
      method: "post",
      url: USERS_URL,
      payload: null,
    });

    await dispatch(logout());

    push("/");
  };

  useEffect(() => {
    if (link === "sign-out") {
      setLoading(true);
      logOutServer();
      setLoading(false);
    }
  }, []);

  if (loading) return "Loading...";

  return (
    <Link
      className={`btn ${fill ? "fill" : ""} ${light ? "light" : ""}`}
      href={link === "sign-out" ? "/" : link}
    >
      {text}
    </Link>
  );
};

export default Button;
