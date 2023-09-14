import CreateSession from "@/components/Forms/CreateSession";
import LinkItem from "@/components/LinkItem";
import React from "react";

const Page = () => {
  return (
    <section>
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
            <p>
              Don&apos;t have an account?{" "}
              <LinkItem path="/create-profile" linkname="Sign Up" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
