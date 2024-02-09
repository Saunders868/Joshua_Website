"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { PRODUCTS_URL, USERS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";
import Link from "next/link";

const Page = () => {
  const userData = useAppSelector((state) => state.user.user);
  const {
    loading: userLoading,
    response: userResponse,
    error: userError,
  } = useAxios({
    url: USERS_URL,
    token: {
      token: userData.token,
      refreshToken: userData.refreshToken,
    },
  });

  const {
    loading: productLoading,
    response: productResponse,
    error: productError,
  } = useAxios({
    url: PRODUCTS_URL,
    token: {
      token: userData.token,
      refreshToken: userData.refreshToken,
    },
  });

  if (userLoading || productLoading) return <Loading />;

  if (userError || productError) return <Error />;

  return (
    <>
      <DashboardPageHeader title="Dashboard" />
      <div className="admin__content single__admin__page">
        <div className="single__admin__page__dashboard">
          <div className="single__admin__page__dashboard__card">
            <div className="single__admin__page__dashboard__card__left">
              <h3>Users</h3>
              <p>{userResponse?.data.length}</p>
            </div>
            <div className="single__admin__page__dashboard__card__right">
              <div className="dashboard-link-container">
                <Link href={"users"}>view all</Link>
              </div>
            </div>
          </div>
          <div className="single__admin__page__dashboard__card">
            <div className="single__admin__page__dashboard__card__left">
              <h3>Products</h3>
              <p>{productResponse?.data.length}</p>
            </div>
            <div className="single__admin__page__dashboard__card__right">
              <div className="dashboard-link-container">
                <Link href={"products"}>view all</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
