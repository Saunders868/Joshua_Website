"use client";

import CreateUser from "@/components/Forms/CreateUser";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    console.log("Session: ", session);

    // if (session.status == "authenticated") {
    //   push("/checkout");
    // }
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

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
