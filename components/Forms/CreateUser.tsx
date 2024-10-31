"use client";

import { initialUserValues } from "@/data";
import { CreateUserValidation } from "@/validations";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState, SetStateAction } from "react";
import Loading from "../Loading";
import {
  createSession,
  createUser,
  generateValidPassword,
} from "@/utils/utils";

const CreateUser = ({
  setShowConfirmation,
  buttonText,
  redirectUrl,
  password,
}: {
  setShowConfirmation: React.Dispatch<SetStateAction<boolean>>;
  buttonText?: string;
  redirectUrl?: string;
  password?: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  let generatedPassword = generateValidPassword();

  const formik = useFormik({
    initialValues: password
      ? { ...initialUserValues, password: generatedPassword }
      : initialUserValues,
    validationSchema: CreateUserValidation,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        if (password === true) {
          await createUser({
            values: { ...values },
            mailString: `Welcome from Joshua Greene! We're thrilled to have you join our community of valued customers! You can sign in to your account using the following credentials. Email: ${values.email}, Password: ${generatedPassword}`,
            router,
          });

          await createSession({
            values: { email: values.email, password: values.password },
            router,
            url: "/checkout",
          });
        } else {
          await createUser({
            values: { ...values },
            mailString:
              "Welcome from Joshua Greene! We're thrilled to have you join our community of valued customers!",
            router,
            setShowConfirmation,
          });

          await createSession({
            values: { email: values.email, password: values.password },
            router,
          });
        }
      } catch (error) {
        console.error("Error during user creation or session creation:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  if (loading) return <Loading />;

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className="grid">
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

      {password == false ? (
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
      ) : (
        <div className="form__input hidden">
          <label className="form__input__label" htmlFor="password">
            Password:
          </label>
          <input
            className="form__input__field"
            id="password"
            type="text"
            {...formik.getFieldProps("password")}
            value={generatedPassword}
            disabled={true}
          />

          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
      )}

      <div className="action">
        <button className="action-button" type="submit">
          {buttonText ? buttonText : "Get started"}
        </button>
      </div>
    </form>
  );
};

export default CreateUser;
