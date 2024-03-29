"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import { CARTS_URL, FRONTEND_URL } from "@/constants";
import { useAxios } from "@/utils/useAxios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

const Page = () => {
  const { loading, response, error } = useAxios({
    url: CARTS_URL,
  });

  const cartsData: [] = response?.data;

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Customer",
      type: "string",
      valueGetter: (cartsData) => cartsData.row.userId,
      renderCell: (params) => {
        return (
          <div className="black_link">
            <Link
              href={`${FRONTEND_URL}/admin/users/${params.value._id}`}
              key={params.value._id}
            >
              {params.value.name}
            </Link>
          </div>
        );
      },
      minWidth: 150,
      flex: 1,
    },
    {
      field: "products",
      headerName: "Items Summary",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="black_link">
            {params.value.map((product: any) => (
              <Link
                href={`${FRONTEND_URL}/admin/products/${product.product_id}`}
                key={product.product_id}
              >
                {product.title} | {product.quantity}
              </Link>
            ))}
          </div>
        );
      },
    },
    {
      field: "id",
      headerName: "View Cart",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="black_link">
            <Link
              href={`${FRONTEND_URL}/admin/carts/${params.value}`}
              key={params.value}
            >
              view
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <section>
      <DashboardPageHeader title="Carts" />
      <p>view carts</p>

      <div className="m-top">
        {loading ? (
          <Loading />
        ) : (
          <>
            {error === null ? (
              <>
                {/* @ts-ignore */}
                {response && response.data.length === 0 ? (
                  <NoData text="Cart" />
                ) : (
                  <DataGrid
                    getRowId={(row) => row._id}
                    rows={cartsData}
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
