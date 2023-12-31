"use client";

import { MAIL_URL, USERS_URL } from "@/constants";
import { initialUserValues } from "@/data";
import { axiosCall } from "@/utils/Axios";
import { CreateUserValidation } from "@/validations";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState, SetStateAction } from "react";
import { toast } from "react-toastify";
import Loading from "../Loading";

const CreateUser = ({
  setShowConfirmation,
}: {
  setShowConfirmation: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const formik = useFormik({
    initialValues: initialUserValues,
    validationSchema: CreateUserValidation,
    onSubmit: async (values) => {
      setLoading(true);
      const response = await axiosCall({
        method: "post",
        url: USERS_URL,
        payload: { ...values },
      });

      if (response?.status === 200) {
        // await axiosCall({
        //   method: "post",
        //   url: MAIL_URL,
        //   payload: {
        //     username: values.username,
        //     userEmail: values.email,
        //     text: "Welcome from Joshua Greene! We're thrilled to have you join our community of valued customers!",
        //     subject: "Signup Successfull",
        //   },
        // });
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
      setLoading(false);
    },
  });

  if (loading) return <Loading />;

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className="form__input">
        <label className="form__input__label" htmlFor="firstName">
          First Name:
        </label>
        <input
          className="form__input__field"
          id="firstName"
          type="text"
          {...formik.getFieldProps("firstName")}
        />

        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="error">{formik.errors.firstName}</div>
        ) : null}
      </div>

      <div className="form__input">
        <label className="form__input__label" htmlFor="lastName">
          Surname:
        </label>
        <input
          className="form__input__field"
          id="lastName"
          type="text"
          {...formik.getFieldProps("lastName")}
        />

        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="error">{formik.errors.lastName}</div>
        ) : null}
      </div>

      <div className="form__input">
        <label className="form__input__label" htmlFor="email">
          Email:
        </label>
        <input
          className="form__input__field"
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
        />

        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
      </div>

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
          <div className="error">{formik.errors.username}</div>
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

      <div className="form__input">
        <label className="form__input__label" htmlFor="passwordConfirmation">
          Confirm Password:
        </label>
        <input
          className="form__input__field"
          id="passwordConfirmation"
          type="text"
          {...formik.getFieldProps("passwordConfirmation")}
        />

        {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation ? (
          <div className="error">{formik.errors.passwordConfirmation}</div>
        ) : null}
      </div>
      <div className="action">
        <button className="action-button" type="submit">
          Get started
        </button>
      </div>
    </form>
  );
};

export default CreateUser;
