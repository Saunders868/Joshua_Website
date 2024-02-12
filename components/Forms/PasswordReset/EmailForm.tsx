"use client";

import { MAIL_URL, USERS_URL } from "@/constants";
import { axiosCall } from "@/utils/Axios";
import { EmailValidation } from "@/validations";
import { useFormik } from "formik";
import React, { SetStateAction, useState } from "react";
import { toast } from "react-toastify";

const EmailForm = ({
  setActive,
  setEmail,
}: {
  setActive: React.Dispatch<SetStateAction<string>>;
  setEmail: React.Dispatch<SetStateAction<string>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: EmailValidation,
    onSubmit: async (values) => {
      setLoading(true);

      const response = await axiosCall({
        method: "get",
        url: `${USERS_URL}/generateOTP`,
        params: {
          email: values.email,
        },
        payload: { ...values },
      });

      if (response?.status === 201) {
        setActive("otp");
        setEmail(values.email);

        const otpSent = await axiosCall({
          method: "post",
          url: MAIL_URL,
          payload: {
            username: values.email,
            userEmail: values.email,
            text: `Please use the following OTP to reset your password ${response.data.code}`,
            subject: "Password Reset",
          },
        });

        if (otpSent.status === 200) {
          setActive("otp");
          setEmail(values.email);

          toast.success("OTP created successfully. Please check your email.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error(
            "An error occured while sending email. Please try again.",
            {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
        }
      } else {
        toast.error("An error occured. Please try again later.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      setLoading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  if (loading)
    return (
      <div className="loading">
        <p>Sending OTP...</p>
      </div>
    );

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__input">
        <label className="form__input__label" htmlFor="email">
          Enter your email:
        </label>
        <input
          className="form__input__field"
          id="email"
          type="text"
          {...formik.getFieldProps("email")}
        />

        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="action">
        <button className="action-button" type="submit">
          Send OTP
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
