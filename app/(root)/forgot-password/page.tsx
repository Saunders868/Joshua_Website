"use client";

import ForgotPassword from "@/components/Forms/ForgotPassword";
import LinkItem from "@/components/LinkItem";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const { push } = useRouter();
  const userData = useAppSelector((state) => state.user.user);
  const [active, setActive] = useState<string>("email");
  if (userData.email !== "") {
    push("/");
  }
  return (
    <main>
      <div className="container">
        <div className="hero">
          <div className="hero__image session">
            <h2 className="hero__image__heading">
              Trouble Logging In?
              <small>Reset your password below</small>
            </h2>
          </div>
          <ForgotPassword active={active} setActive={setActive} />
          <div className="hero__info">
            {active === "email" ? (
              <p>
                Go Back <LinkItem path="/sign-in" linkname="sign-in" />
              </p>
            ) : (
              <div className="hero__info__flex">
                <p>
                  Go Back <LinkItem path="/sign-in" linkname="sign-in" />
                </p>
                <p>
                  Didn&apos;t get OTP
                  <div className="link-container">
                    <a
                      onClick={() => {
                        setActive("email");
                      }}
                    >
                      Re-send OTP
                    </a>
                  </div>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
