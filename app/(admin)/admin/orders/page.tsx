"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import { FRONTEND_URL, ORDERS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import Link from "next/link";

const Page = () => {
  const userData = useAppSelector((state) => state.user.user);  
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
      headerName: "Customer",
      type: "string",
      valueGetter: (cartsData) => cartsData.row.user,
      renderCell: (params) => {
        return (
          <div className="black_link">
            <Link href={`${FRONTEND_URL}/admin/users/${params.value._id}`} key={params.value._id}>
              {params.value.name}
            </Link>
          </div>
        );
      },
      minWidth: 150,
      flex: 1
    },
    {
      field: "createdAt",
      headerName: "Placed On",
      type: "string",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
            <p>
              {moment(params.value).format("MMM Do YY")}
            </p>
        );
      },
    },
    {
      field: "isCompleted",
      headerName: "Status",
      type: "boolean",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return params.value === true ? (
          <div>
            <p>
              <span className="status completed">
                completed
              </span>
            </p>
          </div>
        ) : (
          <div>
            <p>
              <span className="status process">
                pending
              </span>
            </p>
          </div>
        );
      },
    },
    {
      field: "cart",
      headerName: "View Cart",
      type: "string",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="black_link">
            <Link href={`${FRONTEND_URL}/admin/carts/${params.value}`} key={params.value}>
              view
            </Link>
          </div>
        );
      },
    },
    {
      field: "id",
      headerName: "View Order",
      type: "string",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="black_link">
            <Link href={`${FRONTEND_URL}/admin/orders/${params.value}`} key={params.value}>
              view
            </Link>
          </div>
        );
      },
    },
  ];
  
  return (
    <section>
      <DashboardPageHeader title="Orders" />
      <p>view orders, update orders</p>

      <div className="m-top">
        {loading ? (
          <Loading />
        ) : (
          <>
            {error === null ? (
              <>
                {/* @ts-ignore */}
                {response && response.data.length === 0 ? (
                  <NoData text="Order" />
                ) : (
                  <DataGrid
                    getRowId={(row) => row._id}
                    rows={ordersData}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                      },
                    }}
                    pageSizeOptions={[10, 20]}
                  />
                )}
              </>
            ) : (
              <Error />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
