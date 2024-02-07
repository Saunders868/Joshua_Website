"use client";

import { USERS_URL } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login } from "@/redux/slices/user.slice";
import { axiosCall } from "@/utils/Axios";
import { OTPValidation } from "@/validations";
import { useFormik } from "formik";
import React, { SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const VerifyOTP = ({
  username,
  setActive,
}: {
  username: string;
  setActive: React.Dispatch<SetStateAction<string>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      OTP: "",
    },
    validationSchema: OTPValidation,
    onSubmit: async (values) => {
      setLoading(true);
      setActive("password");
      /*  const response = await axiosCall({
        method: "post",
        url: `${USERS_URL}/verifyOTP`,
        params: {
          username: username,
          OTP: values.OTP,
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
        <label className="form__input__label" htmlFor="OTP">
          Enter OTP:
        </label>
        <input
          className="form__input__field"
          id="OTP"
          type="text"
          maxLength={6}
          {...formik.getFieldProps("OTP")}
        />

        {formik.touched.OTP && formik.errors.OTP ? (
          <div className="error">{formik.errors.OTP}</div>
        ) : null}
      </div>
      <div className="action">
        <button className="action-button" type="submit">
          Verify OTP
        </button>
      </div>
    </form>
  );
};

export default VerifyOTP;
