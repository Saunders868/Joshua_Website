"use client";

import { initialSessionValues } from "@/data";
import { CreateSessionValidation } from "@/validations";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createSession } from "@/utils/utils";

const CreateSession = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialSessionValues,
    validationSchema: CreateSessionValidation,
    onSubmit: async (values) => {
      setLoading(true);

      await createSession({
        values: { email: values.email, password: values.password },
        router,
        url: "/profile/user",
      });

      setLoading(false);
    },
  });

  if (loading) return "Loading...";

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
