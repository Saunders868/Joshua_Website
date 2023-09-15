"use client";

import { PRODUCTS_URL } from "@/constants";
import { initialProductValues } from "@/data";
import { axiosCall } from "@/utils/Axios";
import { CreateProductValidation } from "@/validations";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { push } = useRouter();
  const formik = useFormik({
    initialValues: initialProductValues,
    validationSchema: CreateProductValidation,
    onSubmit: async (values) => {
      const response = await axiosCall({
        method: "post",
        url: PRODUCTS_URL,
        payload: { ...values, type: "virtual" },
      });

      console.log(response);
      

      if (response?.status === 200) {
        push("/admin/products");
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
    },
  });
  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className="form__input">
        <label className="form__input__label" htmlFor="title">
          First Name:
        </label>
        <input
          className="form__input__field"
          id="title"
          type="text"
          {...formik.getFieldProps("title")}
        />

        {formik.touched.title && formik.errors.title ? (
          <div className="error">{formik.errors.title}</div>
        ) : null}
      </div>

      <div className="form__input">
        <label className="form__input__label" htmlFor="desc">
          Surname:
        </label>
        <input
          className="form__input__field"
          id="desc"
          type="text"
          {...formik.getFieldProps("desc")}
        />

        {formik.touched.desc && formik.errors.desc ? (
          <div className="error">{formik.errors.desc}</div>
        ) : null}
      </div>

      <div className="form__input">
        <label className="form__input__label" htmlFor="price">
          price:
        </label>
        <input
          className="form__input__field"
          id="price"
          type="number"
          {...formik.getFieldProps("price")}
        />

        {formik.touched.price && formik.errors.price ? (
          <div className="error">{formik.errors.price}</div>
        ) : null}
      </div>

      <div className="action">
        <button className="action-button" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateProduct