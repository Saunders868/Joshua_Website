"use client";

import { USERS_URL } from "@/constants";
import { axiosCall } from "@/utils/Axios";
import { UpdateUserValidation } from "@/validations";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Loading";

const UpdateUser = ({ id, username, email, firstName, lastName, role, profile }: { id: string, username: string; email: string; firstName: string; lastName: string, role: string, profile?: boolean }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { push } = useRouter();
    const formik = useFormik({
        initialValues: {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: role
        },
        validationSchema: UpdateUserValidation,
        onSubmit: async (values) => {
            setLoading(true);
            const response = await axiosCall({
                method: "patch",
                url: `${USERS_URL}/${id}`,
                payload: { ...values },
            });

            console.log(response);

            if (response?.status === 200) {
                toast.success("User updated successfully.", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                push("/profile/dashboard")
            } else if (response?.status === 404) {
                toast.error("This user was not found.", {
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
            setLoading(false)
        },
    });

    if (loading) return <Loading />;

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            {profile ? (
                <>
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

                    <input
                        className="form__input__field"
                        id="role"
                        type="hidden"
                        {...formik.getFieldProps("role")}
                    />
                </>
            ) : (
                <>
                    <div className="form__input">
                        <label className="form__input__label" htmlFor="firstName">
                            First Name:
                        </label>
                        <input
                            className="form__input__field"
                            id="firstName"
                            type="text"
                            readOnly
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
                            readOnly
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
                            readOnly
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
                            readOnly
                            {...formik.getFieldProps("username")}
                        />

                        {formik.touched.username && formik.errors.username ? (
                            <div className="error">{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div className="form__input">
                        <label className="form__input__label" htmlFor="role">
                            Role:
                        </label>
                        <select
                            className="form__input__field"
                            id="role"
                            {...formik.getFieldProps("role")}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        {formik.touched.role && formik.errors.role ? (
                            <div className="error">{formik.errors.role}</div>
                        ) : null}
                    </div>
                </>
            )}

            <div className="action">
                <button className="action-button" type="submit">
                    Update
                </button>
            </div>
        </form>
    );
};

export default UpdateUser;