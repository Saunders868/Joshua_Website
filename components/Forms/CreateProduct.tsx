"use client";

import { PRODUCTS_URL } from "@/constants";
import { initialProductValues } from "@/data";
import { useAppSelector } from "@/redux/hooks";
import { axiosCall } from "@/utils/Axios";
import { CreateProductValidation } from "@/validations";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const userData = useAppSelector((state) => state.user);
  const { push } = useRouter();
  const formik = useFormik({
    initialValues: initialProductValues,
    validationSchema: CreateProductValidation,
    onSubmit: async (values) => {
      setLoading(true);
      const response = await axiosCall({
        method: "post",
        url: PRODUCTS_URL,
        payload: {
          ...values,
          type: "virtual",
          image:
            "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        },
        token: { token: userData.token, refreshToken: userData.refreshToken },
      });

      if (response?.status === 200) {
        toast.success("Product Created Successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
      } else if (response?.status === 403) {
        toast.error("Unauthorized user!", {
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

  if (loading) return "Loading...";

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className="form__input">
        <label className="form__input__label" htmlFor="title">
          Title:
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
          Description:
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
};

export default CreateProduct;
