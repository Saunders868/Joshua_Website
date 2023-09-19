"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import NoData from "@/components/NoData";
import SessionsTable from "@/components/Tables/SessionsTable";
import { SESSIONS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";

const Page = () => {
  const userData = useAppSelector((state) => state.user);
  const { loading, response, error } = useAxios({
    url: SESSIONS_URL,
    token: {
      token: userData.token,
      refreshToken: userData.refreshToken,
    },
  });

  console.log(userData);
  
  
  return (
    <section>
      <DashboardPageHeader title="Sessions" />
      <p>view sessions</p>

      <div className="m-top">
        {loading ? (
          "Loading..."
        ) : (
          <>
            {error === null ? (
              <>
                {response && response.data.length === 0 ? (
                  <NoData text="Carts" />
                ) : (
                  <SessionsTable dataArray={response?.data} />
                )}
              </>
            ) : (
              `A network error has occured. Please try again later`
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
