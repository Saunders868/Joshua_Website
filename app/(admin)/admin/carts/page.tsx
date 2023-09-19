"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import NoData from "@/components/NoData";
import { CARTS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";

const Page = () => {
  const userData = useAppSelector((state) => state.user);
  const { loading, response, error } = useAxios({
    url: CARTS_URL,
    token: {
      token: userData.token,
      refreshToken: userData.refreshToken,
    },
  });
  return (
    <section>
      <DashboardPageHeader title="Carts" />
      <p>view carts</p>

      <div className="m-top">
        {loading ? (
          "Loading..."
        ) : (
          <>
            {error === null ? (
              <>
                {/* @ts-ignore */}
                {response && response.length === 0 ? (
                  <NoData text="Carts" />
                ) : (
                  "data goes here"
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
