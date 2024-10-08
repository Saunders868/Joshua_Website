"use client";

import CreateSession from "@/components/Forms/CreateSession";
import LinkItem from "@/components/LinkItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const session = useSession();

  if (session.status == "authenticated") {
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
              <div>
                Don&apos;t have an account?{" "}
                <LinkItem path="/create-profile" linkname="Sign Up" />
              </div>
              <div>
                Forgot Password?{" "}
                <LinkItem path="/forgot-password" linkname="Reset password" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
