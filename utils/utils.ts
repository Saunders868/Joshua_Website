import { toast } from "react-toastify";
import { signIn, signOut } from "next-auth/react";
import { axiosCall } from "./Axios";
import {
  API_CONFLICT_CODE,
  API_SUCCESS_CODE,
  MAIL_URL,
  PRODUCTS_URL,
  SESSIONS_URL,
  USERS_URL,
} from "@/constants";
import { SetStateAction } from "react";
import { CartP } from "@/redux/slices/cart.slice";

export function convertStringToBoolean(string: string) {
  let boolean;
  if (string == "true") {
    boolean = true;
  } else if (string == "false") {
    boolean = false;
  }

  return boolean;
}

export async function getProductData({ id }: { id: string }) {
  const product = await axiosCall({
    method: "get",
    url: `${PRODUCTS_URL}/${id}`,
    payload: null,
  });

  return product;
}

export async function createSession({
  values,
  router,
  url,
  NoRedirect,
}: {
  values: { email: string; password: string };
  router: {
    push: (url: string) => void;
    back: () => void;
  };
  url?: string;
  NoRedirect?: boolean;
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
      throw new Error("Invalid credentials");
    } else {
      toast.success("Logged in!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (url) {
        router.push(url);
      } else {
        router.push("/profile/user");
      }
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
    throw new Error("Session creation failed");
  }
}

export async function createUser({
  values,
  mailString,
  redirectUrl,
  router,
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
  router: {
    push: (url: string) => void;
    back: () => void;
  };
  redirectUrl?: string;
  setShowConfirmation?: React.Dispatch<SetStateAction<boolean>>;
}) {
  const response = await axiosCall({
    method: "POST",
    url: USERS_URL,
    payload: { ...values },
  });

  if (response?.status === API_SUCCESS_CODE) {
    await sendEmail({
      username: values.firstName,
      email: values.email,
      body: mailString,
      subject: "Signup Successful",
    });
    if (setShowConfirmation) {
      setShowConfirmation(true);
    }
    if (redirectUrl) {
      router.push(redirectUrl);
    }
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
    throw new Error("User conflict: " + response.data.error);
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
    throw new Error("User creation failed");
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

export async function sendEmail({
  username,
  email,
  body,
  subject,
}: {
  username: string;
  email: string;
  body: string;
  subject: string;
}) {
  await axiosCall({
    method: "POST",
    url: MAIL_URL,
    payload: {
      username,
      userEmail: email,
      text: body,
      subject: subject,
    },
  });
}

export const emailTemplate = ({
  userName,
  products,
  orderLink,
}: {
  userName: string;
  products: CartP[];
  orderLink: string;
}) => `
<body style="font-family: Arial, sans-serif; background-color: #ffffff; margin: 0; padding: 0;">
    <div style="width: 100%; padding: 20px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: 40px auto;">
        <div style="text-align: center; background-color: black; color: white; padding: 20px;">
            <h1 color: white; style="margin: 0;">Order Confirmation</h1>
        </div>
        <div style="padding: 20px;">
            <p>Hi ${userName},</p>
            <p>Thank you for your order! Here are the details of your purchase:</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr>
                        <th style="padding: 10px; border: 1px solid #dddddd; background-color: #f8f8f8; text-align: left;">Product</th>
                        <th style="padding: 10px; border: 1px solid #dddddd; background-color: #f8f8f8; text-align: left;">Quantity</th>
                        <th style="padding: 10px; border: 1px solid #dddddd; background-color: #f8f8f8; text-align: left;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${products
                      .map(
                        (product) => `
                    <tr>
                        <td style="padding: 10px; border: 1px solid #dddddd;">${product.title}</td>
                        <td style="padding: 10px; border: 1px solid #dddddd;">${product.quantity}</td>
                        <td style="padding: 10px; border: 1px solid #dddddd;">${product.price} USD</td>
                    </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>

            <p style="margin-top: 20px;">If you’d like to view the status of your order, click the link below:</p>
            <a href="${orderLink}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: black; text-align: center; color: white; text-decoration: none; border-radius: 5px;">View Order Here</a>
        </div>
    </div>
</body>
</html>
`;
