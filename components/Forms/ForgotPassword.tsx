"use client";
import React, { useState } from "react";
import UserName from "./PasswordReset/UserName";
import VerifyOTP from "./PasswordReset/VerifyOTP";
import ChangePassword from "./PasswordReset/ChangePassword";

const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState<string>("username");
  const [username, setUsername] = useState<string>("");

  return (
    <div className="forgot_password">
      <span className="overflow-hidden">
        <div className={active === "username" ? "username active" : "username"}>
          <UserName setActive={setActive} />
        </div>
        <div className={active === "otp" ? "otp active" : "otp"}>
          <VerifyOTP username={username} setActive={setActive} />
        </div>
        <div className={active === "password" ? "password active" : "password"}>
          <ChangePassword username={username} />
        </div>
      </span>
    </div>
  );
};

export default ForgotPassword;
