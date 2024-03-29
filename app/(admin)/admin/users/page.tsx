"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import { USERS_URL } from "@/constants";
import { useAxios } from "@/utils/useAxios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

const Page = () => {
  const { loading, response, error } = useAxios({
    url: USERS_URL,
  });

  const usersData: [] = response?.data;

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      type: "string",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "username",
      headerName: "Username",
      type: "string",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <p>
              <a href={`mailto:${params.value}`}>{params.value}</a>
            </p>
          </div>
        );
      },
    },
    {
      field: "role",
      headerName: "Status",
      type: "string",
      renderCell: (params) => {
        return params.value === "admin" ? (
          <div>
            <p>
              <span className="status completed">Admin</span>
            </p>
          </div>
        ) : (
          <div>
            <p>
              <span className="status process">User</span>
            </p>
          </div>
        );
      },
    },
    {
      field: "_id",
      headerName: "Edit",
      type: "string",
      renderCell: (params) => {
        return (
          <div>
            <Link className="link" href={`users/${params.value}`}>
              Edit
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <section>
      <DashboardPageHeader title="Users" />
      <p>view users, update users</p>

      <div className="m-top">
        {loading ? (
          <Loading />
        ) : (
          <>
            {error === null ? (
              <>
                {/* @ts-ignore */}
                {response && response.data.length === 0 ? (
                  <NoData text="Carts" />
                ) : (
                  <DataGrid
                    getRowId={(row) => row._id}
                    rows={usersData}
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
              `A network error has occured. Please try again later`
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
