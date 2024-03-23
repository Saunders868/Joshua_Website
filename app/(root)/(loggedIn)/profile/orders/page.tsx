"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import { ORDERS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

const Page = () => {
  const user = useAppSelector((state) => state.user.user);
  const { response, error, loading } = useAxios({
    url: `${ORDERS_URL}/user/${user.id}`,
  });

  if (loading) return <Loading />;

  if (error) return <Error />;

  const ordersData = response?.data;

  const columns: GridColDef[] = [
    {
      field: "createdAt",
      headerName: "Placed On",
      type: "string",
      minWidth: 150,
      flex: 1,
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
              <span className="status completed">completed</span>
            </p>
          </div>
        ) : (
          <div>
            <p>
              <span className="status process">pending</span>
            </p>
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
            <Link href={`orders/${params.value}`} key={params.value}>
              view
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <section>
      <DashboardPageHeader title="My Orders" />
      <div className="admin__content single__admin__page">
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
      </div>
    </section>
  );
};

export default Page;
