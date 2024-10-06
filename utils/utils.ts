import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { axiosCall } from "./Axios";
import { MAIL_URL, USERS_URL } from "@/constants";
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

  if (response?.status === 200) {
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
  } else if (response?.status === 409) {
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
