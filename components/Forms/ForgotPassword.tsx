"use client";
import React, { SetStateAction, useState } from "react";

import VerifyOTP from "./PasswordReset/VerifyOTP";
import ChangePassword from "./PasswordReset/ChangePassword";
import EmailForm from "./PasswordReset/EmailForm";

const ForgotPassword = ({
  active,
  setActive,
}: {
  active: string;
  setActive: React.Dispatch<SetStateAction<string>>;
}) => {
  const [email, setEmail] = useState<string>("");

  return (
    <div className="forgot_password">
      <span className="overflow-hidden">
        <div className={active === "email" ? "email active" : "email"}>
          <EmailForm setActive={setActive} setEmail={setEmail} />
        </div>
        <div className={active === "otp" ? "otp active" : "otp"}>
          <VerifyOTP email={email} setActive={setActive} />
        </div>
        <div className={active === "password" ? "password active" : "password"}>
          <ChangePassword email={email} />
        </div>
      </span>
    </div>
  );
};

export default ForgotPassword;
