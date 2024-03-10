"use client";

import CreateSession from "@/components/Forms/CreateSession";
import LinkItem from "@/components/LinkItem";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const userData = useAppSelector((state) => state.user.user);
  if (userData.email !== "") {
    router.back();
  }
  return (
    <main>
      <div className="container">
        <div className="hero">
          <div className="hero__image session">
            <h2 className="hero__image__heading">
              Welcome back
              <small>Log in to your account</small>
            </h2>
          </div>
          <CreateSession />
          <div className="hero__info">
            <div className="hero__info__flex">
              <p>
                Don&apos;t have an account?{" "}
                <LinkItem path="/create-profile" linkname="Sign Up" />
              </p>
              <p>
                Forgot Password?{" "}
                <LinkItem path="/forgot-password" linkname="Reset password" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
