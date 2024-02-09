"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { USERS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";
import React from "react";

const Page = () => {
  const user = useAppSelector((state) => state.user.user);

  const { response, error, loading } = useAxios({
    url: `${USERS_URL}/${user.id}`,
    token: {
      token: user.token,
      refreshToken: user.refreshToken,
    },
  });

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <section>
      <DashboardPageHeader title="My Downloads" />
      <div className="admin__content single__admin__page">
        {response?.data.productPermissions.length > 0 ? (
          <div>
            {response?.data.productPermissions.forEach((element: string) => {
              <li key={element}>{element}</li>;
            })}
          </div>
        ) : (
          <p>You do not have any downloads...</p>
        )}
      </div>
    </section>
  );
};

export default Page;
