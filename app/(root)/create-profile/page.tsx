"use client";

import CreateUser from "@/components/Forms/CreateUser";
import LinkItem from "@/components/LinkItem";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const Page = () => {
  const { push } = useRouter();
  const userData = useAppSelector((state) => state.user);
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
          <CreateUser />
          <div className="hero__info">
            <p>
              Already have an account?{" "}
              <LinkItem path="/sign-in" linkname="sign-in" />
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
