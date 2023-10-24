"use client";

import { ORDERS_URL } from "@/constants";
import { axiosCall } from "@/utils/Axios";
import { UpdateOrderValidation } from "@/validations";
import { convertStringToBoolean } from "@/utils/utils";
import { useAppSelector } from "@/redux/hooks";
import Loading from "../Loading";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const UpdateOrder = ({ isCompleted, orderId }: { isCompleted: string, orderId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const userData = useAppSelector((state) => state.user.user);
  const { push } = useRouter();
  const formik = useFormik({
    initialValues: {
      isCompleted,
    },
    validationSchema: UpdateOrderValidation,
    onSubmit: async (values) => {
      setLoading(true);

      let isCompletedAsBoolean = convertStringToBoolean(values.isCompleted);
      const response = await axiosCall({
        method: "patch",
        url: `${ORDERS_URL}/${orderId}`,
        payload: {
          isCompleted: isCompletedAsBoolean,
        },
        token: { token: userData.token, refreshToken: userData.refreshToken },
      });

      console.log(response);

      if (response?.status === 201) {
        toast.success("Order Successfully Updated!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        push("/admin/orders");
      } else if (response?.status === 409) {
        toast.error("Unable to update order at this time. Please try again later.", {
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
        <label className="form__input__label" htmlFor="isCompleted">
          Status:
        </label>
        <select
          className="form__input__field"
          id="isCompleted"
          {...formik.getFieldProps("isCompleted")}
        >
          <option value="true">Completed</option>
          <option value="false">Pending</option>
        </select>

        {formik.touched.isCompleted && formik.errors.isCompleted ? (
          <div className="error">{formik.errors.isCompleted}</div>
        ) : null}
      </div>
      <div className="action">
        <button className="action-button" type="submit">
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateOrder;
