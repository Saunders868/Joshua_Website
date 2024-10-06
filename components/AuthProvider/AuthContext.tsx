import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export const AuthContext = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();
  return (
    <SessionProvider
      session={session}
      basePath="/api/auth"
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
};
