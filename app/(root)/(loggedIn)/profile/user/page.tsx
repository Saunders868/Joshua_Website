"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import Error from "@/components/Error";
import UpdateUser from "@/components/Forms/UpdateUser";
import Loading from "@/components/Loading";
import { USERS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";

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

  // console.log(response);

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
          username={response?.data.username}
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
