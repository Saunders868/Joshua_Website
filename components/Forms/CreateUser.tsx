"use client";

import { initialUserValues } from "@/data";
import { CreateUserValidation } from "@/validations";
import { useFormik } from "formik";
import React from "react";

const CreateUser = () => {
  const formik = useFormik({
    initialValues: initialUserValues,
    validationSchema: CreateUserValidation,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form__control">
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          {...formik.getFieldProps('firstName')}
        />

        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}
      </div>

      <div className="form__control">
        <label htmlFor="lastName">Surname:</label>
        <input
          id="lastName"
          type="text"
          {...formik.getFieldProps('lastName')}
        />

        {formik.touched.lastName && formik.errors.lastName ? (
          <div>{formik.errors.lastName}</div>
        ) : null}
      </div>

      <div className="form__control">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
        />

        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="form__control">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          {...formik.getFieldProps('username')}
        />

        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
      </div>

      <div className="form__control">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="text"
          {...formik.getFieldProps('password')}
        />

        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>

      <div className="form__control">
        <label htmlFor="passwordConfirmation">Confirm Password:</label>
        <input
          id="passwordConfirmation"
          type="text"
          {...formik.getFieldProps('passwordConfirmation')}
        />

        {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
          <div>{formik.errors.passwordConfirmation}</div>
        ) : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateUser;
