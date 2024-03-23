"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (user.email == "") {
      push("/sign-in");
    }
    setIsCheckingAuth(false);
  }, [user, push]);

  return (
    <>
      {isCheckingAuth ? (
        <div>Checking Authentication...</div>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
}
