"use client";

import CreateUser from "@/components/Forms/CreateUser";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const session = useSession();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      push("/checkout");
    }
  }, [session.status, push]);

  return (
    <main>
      <div className="container">
        <div className="hero">
          <CreateUser
            buttonText="Continue to Checkout"
            redirectUrl="/checkout"
            setShowConfirmation={setShowConfirmation}
            password={true}
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
