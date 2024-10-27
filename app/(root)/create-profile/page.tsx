"use client";

import Confirmation from "@/components/Confirmation";
import CreateUser from "@/components/Forms/CreateUser";
import LinkItem from "@/components/LinkItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.back();
    }
  }, []);

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
          <CreateUser
            setShowConfirmation={setShowConfirmation}
            password={false}
          />
          <div className="hero__info">
            <>
              Already have an account?{" "}
              <LinkItem path="/sign-in" linkname="sign-in" />
            </>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <Confirmation
          text="User Created Successfully!"
          location="/profile/user"
        />
      )}
    </main>
  );
};

export default Page;
