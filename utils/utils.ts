import { toast } from "react-toastify";
import { signIn, signOut } from "next-auth/react";
import { axiosCall } from "./Axios";
import {
  API_CONFLICT_CODE,
  API_SUCCESS_CODE,
  MAIL_URL,
  SESSIONS_URL,
  USERS_URL,
} from "@/constants";
import { SetStateAction } from "react";

export function convertStringToBoolean(string: string) {
  let boolean;
  if (string == "true") {
    boolean = true;
  } else if (string == "false") {
    boolean = false;
  }

  return boolean;
}

export async function createSession({
  values,
  push,
  url,
}: {
  values: { email: string; password: string };
  push: (url: string) => void;
  url: string;
}) {
  try {
    const loginResult = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (loginResult?.error == "CredentialsSignin") {
      toast.error("Incorrect email or password", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // try router that back
      push(url);
    }
  } catch (error) {
    toast.error("Incorrect email or password", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

export async function createUser({
  values,
  mailString,
  redirectUrl,
  push,
  setShowConfirmation,
}: {
  values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    productPermissions: string[];
  };
  mailString: string;
  push: (url: string) => void;
  setShowConfirmation: React.Dispatch<SetStateAction<boolean>>;
  redirectUrl?: string;
}) {
  const response = await axiosCall({
    method: "POST",
    url: USERS_URL,
    payload: { ...values },
  });

  if (response?.status === API_SUCCESS_CODE) {
    await axiosCall({
      method: "POST",
      url: MAIL_URL,
      payload: {
        username: values.firstName,
        userEmail: values.email,
        text: mailString,
        subject: "Signup Successful",
      },
    });
    if (redirectUrl) {
      push(redirectUrl);
    }
    setShowConfirmation(true);
  } else if (response?.status === API_CONFLICT_CODE) {
    toast.error(response.data.error, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    toast.error("An error occured.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

export async function logOut({ push }: { push: (url: string) => void }) {
  const response = await axiosCall({
    method: "DELETE",
    url: SESSIONS_URL,
    payload: null,
  });

  if (response.status == API_SUCCESS_CODE) {
    toast.success("Logged out.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    await axiosCall({
      method: "GET",
      url: "/api/sign-out",
      payload: null,
    });

    signOut({ redirect: false });
    push("/");
  }
}

export function generateValidPassword() {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  const getRandomChar = (chars: string) =>
    chars[Math.floor(Math.random() * chars.length)];

  let password = "";

  password += getRandomChar(lowercase);
  password += getRandomChar(uppercase);
  password += getRandomChar(digits);
  password += getRandomChar(specialChars);

  const allChars = lowercase + uppercase + digits + specialChars;
  while (password.length < 8) {
    password += getRandomChar(allChars);
  }

  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
}
