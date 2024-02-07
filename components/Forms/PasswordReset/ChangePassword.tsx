"use client";

import { USERS_URL } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login } from "@/redux/slices/user.slice";
import { axiosCall } from "@/utils/Axios";
import { ChangePasswordValidation } from "@/validations";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const ChangePassword = ({ username }: { username: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: ChangePasswordValidation,
    onSubmit: async (values) => {
      setLoading(true);
      /* const response = await axiosCall({
        method: "post",
        url: `${USERS_URL}/resetPassword`,
        params: {
          username: username,
        //   encrypt password before sending
          OTP: values.password,
        },
        payload: { ...values },
      });

      if (response?.status === 200) {
        // update state
        dispatch(
          login({
            token: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );
        push("/");
      } else if (response?.status === 401) {
        toast.error(response.data, {
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
      } */
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
