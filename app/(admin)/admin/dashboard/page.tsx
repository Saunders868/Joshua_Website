"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { PRODUCTS_URL, USERS_URL } from "@/constants";
import { useAxios } from "@/utils/useAxios";
import DashboardGrid from "@/components/DashboardGrid";
import Chart from "@/components/Chart";
import { useState } from "react";
import Users from "@/icons/Users";
import Products from "@/icons/Products";

const Page = () => {
  const [filter, setFilter] = useState({});

  const {
    loading: userLoading,
    response: userResponse,
    error: userError,
  } = useAxios({
    url: USERS_URL,
  });

  const {
    loading: productLoading,
    response: productResponse,
    error: productError,
  } = useAxios({
    url: PRODUCTS_URL,
  });

  if (userLoading || productLoading) return <Loading />;

  if (userError || productError) return <Error />;

  return (
    <>
      <DashboardPageHeader title="Dashboard" />
      <div className="admin__content single__admin__page">
        <div className="single__admin__page__dashboard">
          <DashboardGrid
            number={userResponse?.data.length}
            title="Users"
            link="users"
            icon={<Users width={128} height={128} />}
          />
          <DashboardGrid
            number={productResponse?.data.length}
            title="Products"
            link="products"
            icon={<Products width={128} height={128} />}
          />
          <div className="single__admin__page__dashboard__card">
            <div className="chart">
              <Chart
                chartId="65c761a4-b4b7-4f6e-8296-4d00a66c8f34"
                width={500}
                height={500}
                filter={filter}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
