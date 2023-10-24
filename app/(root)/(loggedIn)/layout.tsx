"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const user = useAppSelector((state) => state.user.user);

  if (user.email == "") push("/sign-in");
  return <main>{children}</main>;
}
