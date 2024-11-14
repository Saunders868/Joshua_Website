"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Session Expired</h2>
        <p>Your session has expired. Login to continue.</p>
        <button
          className="btn"
          onClick={() => {
            onClose();
            router.push("/sign-in");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
