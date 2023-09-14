"use client";

import { SESSIONS_URL } from "@/constants";
import { initialSessionValues } from "@/data";
import { axiosCall } from "@/utils/Axios";
import { CreateSessionValidation } from "@/validations";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";

const CreateSession = () => {
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
        // prompt the user that thier profile was created successfully then redirect
      } else if (response?.status === 401) {
        // let the user know what happened
        console.log(response);
        /* toast.error(response.data.error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          }); */
      } else {
        // alert the user that an error occured
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
        <label className="form__input__label" htmlFor="username">
          Username:
        </label>
        <input
          className="form__input__field"
          id="username"
          type="text"
          {...formik.getFieldProps("username")}
        />

        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.password}</div>
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
          <div>{formik.errors.password}</div>
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
