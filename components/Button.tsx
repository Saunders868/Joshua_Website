"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosCall } from "@/utils/Axios";
import { SESSIONS_URL } from "@/constants";
import { signOut } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/utils/utils";

const Button = ({
  link,
  text,
  fill,
  light,
  disabled,
}: {
  link: string;
  text: string;
  fill?: boolean;
  light?: boolean;
  disabled?: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();

  const logOutServer = async () => {
    setLoading(true);
    logOut({
      push,
    });
    setLoading(false);
  };

  if (loading) return "Loading...";

  return (
    <Link
      className={`btn ${fill ? "fill" : ""} ${light ? "light" : ""} ${
        disabled ? "disabled" : ""
      }`}
      href={link === "sign-out" ? "/" : link}
      onClick={link === "sign-out" ? logOutServer : () => {}}
    >
      {text}
    </Link>
  );
};

export default Button;
