"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import NoData from "@/components/NoData";
import { ORDERS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface OrderT {

}

const Page = () => {
  const userData = useAppSelector((state) => state.user);  
  const { loading, response, error } = useAxios({
    url: ORDERS_URL,
    token: {
      token: userData.token,
      refreshToken: userData.refreshToken,
    },
  });

  const ordersData: [] = response?.data;
  // console.log(ordersData);

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
      <DashboardPageHeader title="Orders" />
      <p>view orders, update orders</p>

      <div className="m-top">
        {loading ? (
          "Loading..."
        ) : (
          <>
            {error === null ? (
              <>
                {/* @ts-ignore */}
                {response && response.data.length === 0 ? (
                  <NoData text="Order" />
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
