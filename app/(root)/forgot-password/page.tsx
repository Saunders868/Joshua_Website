"use client";

import CreateSession from "@/components/Forms/CreateSession";
import ForgotPassword from "@/components/Forms/ForgotPassword";
import LinkItem from "@/components/LinkItem";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const Page = () => {
  const { push } = useRouter();
  const userData = useAppSelector((state) => state.user.user);
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
          <ForgotPassword />
          <div className="hero__info">
            <p>
              Go Back <LinkItem path="/sign-in" linkname="sign-in" />
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
