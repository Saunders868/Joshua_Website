"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import DownloadItem from "@/components/DownloadItem";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { USERS_URL } from "@/constants";
import { useSession } from "next-auth/react";
import { useAxios } from "@/utils/useAxios";
import React from "react";

const Page = () => {
  const session = useSession();

  const { response, error, loading } = useAxios({
    url: `${USERS_URL}/${session.data.user.id}`,
  });

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <section>
      <DashboardPageHeader title="My Downloads" />
      <div className="admin__content single__admin__page">
        {response?.data.productPermissions.length > 0 ? (
          <ol className="download__items">
            {response?.data.productPermissions.map((element: string) => (
              <DownloadItem item={element} key={element} />
            ))}
          </ol>
        ) : (
          <p>You do not have any downloads...</p>
        )}
      </div>
    </section>
  );
};

export default Page;
