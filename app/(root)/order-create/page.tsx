"use client";

import CreateUser from "@/components/Forms/CreateUser";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const session = useSession();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { push } = useRouter();

  if (session.status == "authenticated") {
    push("/checkout");
  }

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
