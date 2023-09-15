"use client";

import { SESSIONS_URL } from "@/constants";
import { initialSessionValues } from "@/data";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login } from "@/redux/slices/user.slice";
import { axiosCall } from "@/utils/Axios";
import { CreateSessionValidation } from "@/validations";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateSession = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: initialSessionValues,
    validationSchema: CreateSessionValidation,
    onSubmit: async (values) => {
      const response = await axiosCall({
        method: "post",
        url: SESSIONS_URL,
        payload: { ...values },
      });

      if (response?.status === 200) {
        await dispatch(
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
      }
    },
  });
  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className="form__input">
        <label className="form__input__label" htmlFor="email">
          Email:
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

      <div className="form__input">
        <label className="form__input__label" htmlFor="password">
          Password:
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
          Login
        </button>
      </div>
    </form>
  );
};

export default CreateSession;
