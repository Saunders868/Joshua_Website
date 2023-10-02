"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import NoData from "@/components/NoData";
import { CARTS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface CartT {

}

const Page = () => {
  const userData = useAppSelector((state) => state.user.user);
  const { loading, response, error } = useAxios({
    url: CARTS_URL,
    token: {
      token: userData.token,
      refreshToken: userData.refreshToken,
    },
  });

  const cartsData: [] = response?.data;
  // console.log(cartsData);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      type: "string",
      minWidth: 150,
      flex: 1
    }
  ];
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
                {response && response.data.length === 0 ? (
                  <NoData text="Cart" />
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
