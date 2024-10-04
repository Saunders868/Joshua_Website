"use client";

import CreateUser from "@/components/Forms/CreateUser";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  // check if user is already logged in, then check if they alreay have a profile, then check if the book is already there
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { push } = useRouter();
  const userData = useAppSelector((state) => state.user.user);

  if (userData.email !== "") {
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
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
