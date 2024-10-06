"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (session.status != "authenticated") {
      push("/sign-in");
    }
  }, [session, push]);

  return <main>{children}</main>;
}
