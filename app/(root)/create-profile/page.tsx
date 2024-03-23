"use client";

import Confirmation from "@/components/Confirmation";
import CreateUser from "@/components/Forms/CreateUser";
import LinkItem from "@/components/LinkItem";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { push } = useRouter();
  const userData = useAppSelector((state) => state.user.user);
  if (userData.email !== "") {
    push("/");
  }
  return (
    <main>
      <div className="container">
        <div className="hero">
          <div className="hero__image">
            <h2 className="hero__image__heading">
              Get started
              <small>Let us create your account</small>
            </h2>
          </div>
          <CreateUser setShowConfirmation={setShowConfirmation} />
          <div className="hero__info">
            <p>
              Already have an account?{" "}
              <LinkItem path="/sign-in" linkname="sign-in" />
            </p>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <Confirmation text="User Created Successfully!" location="/sign-in" />
      )}
    </main>
  );
};

export default Page;
