"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import Error from "@/components/Error";
import UpdateUser from "@/components/Forms/UpdateUser";
import Loading from "@/components/Loading";
import { USERS_URL } from "@/constants";
import { useSession } from "next-auth/react";
import { useAxios } from "@/utils/useAxios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const session = useSession();
  const { push } = useRouter();
  const [clientLoading, setClientLoading] = useState(true);
  const { response, error, loading } = useAxios({
    url: `${USERS_URL}/${session.data.user.id}`,
  });

  useEffect(() => {
    if (session.status !== "authenticated") {
      push("/sign-in");
    }
    setClientLoading(false);
  }, [session.status, push]);

  if (loading || clientLoading) return <Loading />;

  if (error) return <Error />;

  const parts = response?.data.name.split(" ");
  const firstName = parts[0];
  const lastName = parts[1];

  return (
    <section>
      <DashboardPageHeader title="Update Profile" />
      <div className="admin__content single__admin__page">
        <UpdateUser
          profile
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
