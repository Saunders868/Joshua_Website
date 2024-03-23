"use client";

import { USERS_URL } from "@/constants";
import { axiosCall } from "@/utils/Axios";
import { ChangePasswordValidation } from "@/validations";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const ChangePassword = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: ChangePasswordValidation,
    onSubmit: async (values) => {
      setLoading(true);
      const response = await axiosCall({
        method: "patch",
        url: `${USERS_URL}/resetPassword`,
        payload: {
          email: email,
          password: values.password,
        },
      });

      console.log("reset password response", response);

      if (response?.status === 200) {
        push("/sign-in");
      } else if (response?.status === 404) {
        toast.error("There is no user with this email.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (response?.status === 440) {
        toast.error(
          "There is no session set for user password reset. Please begin the process again.",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
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

  if (loading) return <Loading />;

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className="form__input">
        <label className="form__input__label" htmlFor="password">
          Enter new password:
        </label>
        <input
          className="form__input__field"
          id="password"
          type="text"
          {...formik.getFieldProps("password")}
        />

        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="action">
        <button className="action-button" type="submit">
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
