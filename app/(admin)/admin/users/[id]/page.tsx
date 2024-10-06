"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import UpdateUser from "@/components/Forms/UpdateUser";
import Loading from "@/components/Loading";
import { USERS_URL } from "@/constants";
import { useAxios } from "@/utils/useAxios";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const { response, error, loading } = useAxios({
    url: `${USERS_URL}/${id}`,
  });

  if (loading) return <Loading />;

  if (error) return "A network error occured. Please try again later...";

  const parts = response?.data.name.split(" ");
  const firstName = parts[0];
  const lastName = parts[1];

  return (
    <section>
      <DashboardPageHeader title="Update User" />
      <div className="admin__content single__admin__page">
        <UpdateUser
          id={response?.data._id}
          email={response?.data.email}
          firstName={firstName}
          lastName={lastName}
          role={response?.data.role}
        />
      </div>
    </section>
  );
};

export default Page;
