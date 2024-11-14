"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "./Modal";
import { logOut } from "@/utils/utils";
import { REFRESH_COOKIE_TIME } from "@/constants";

const SessionManager = () => {
  const { data: session } = useSession();
  const { push } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (session) {
      const timer = setTimeout(() => {
        logOut({
          push,
        });
        setIsModalOpen(true);
      }, REFRESH_COOKIE_TIME);

      return () => clearTimeout(timer);
    }
  }, [session]);

  return (
    <>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default SessionManager;
