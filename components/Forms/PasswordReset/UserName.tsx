"use client";

import { USERS_URL } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login } from "@/redux/slices/user.slice";
import { axiosCall } from "@/utils/Axios";
import { UsernameValidation } from "@/validations";
import { useFormik } from "formik";
import React, { SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const UserName = ({
  setActive,
  setUsername,
}: {
  setActive: React.Dispatch<SetStateAction<string>>;
  setUsername: React.Dispatch<SetStateAction<string>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: UsernameValidation,
    onSubmit: async (values) => {
      setLoading(true);
      setActive("otp");
      setUsername(values.username);
      /* const response = await axiosCall({
        method: "post",
        url: `${USERS_URL}/generateOTP`,
        params: {
          username: values.username,
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
        <label className="form__input__label" htmlFor="username">
          Enter your username:
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
      <div className="action">
        <button className="action-button" type="submit">
          Send OTP
        </button>
      </div>
    </form>
  );
};

export default UserName;
