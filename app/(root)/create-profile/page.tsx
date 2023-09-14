import CreateUser from "@/components/Forms/CreateUser";
import LinkItem from "@/components/LinkItem";
import React from "react";

const page = () => {
  return (
    <section>
      <div className="container">
        <div className="hero">
          <div className="hero__image">
            <h2 className="hero__image__heading">
              Get started
              <small>Let us create your account</small>
            </h2>
          </div>
          <CreateUser />
          <div className="hero__info">
            <p>
              Already have an account?{" "}
              <LinkItem path="/sign-in" linkname="sign-in" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
