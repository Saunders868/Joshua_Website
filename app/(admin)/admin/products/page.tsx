"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import NoData from "@/components/NoData";
import { PRODUCTS_URL } from "@/constants";
import { useAxios } from "@/utils/useAxios";
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ProductT } from "@/types";
import Image from "next/image";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const Page = () => {
  const { loading, response, error } = useAxios({
    url: PRODUCTS_URL,
  });

  const productsData: ProductT[] = response?.data;

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      type: "string",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "image",
      headerName: "Image",
      type: "string",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Image height={40} width={40} src={params.value} alt="none" />
          </div>
        );
      },
    },
    {
      field: "id",
      headerName: "Edit",
      type: "string",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Link href={`products/${params.value}`}>Edit</Link>
          </div>
        );
      },
    },
  ];

  return (
    <section>
      <DashboardPageHeader title="Products" />
      <p>create product, update product, delete product, update product</p>

      <div className="admin__content">
        <Link href={"/admin/products/create"}>Create</Link>
      </div>

      <div className="m-top">
        {loading ? (
          <Loading />
        ) : (
          <>
            {error === null ? (
              <>
                {response && response.data.length === 0 ? (
                  <NoData text="Carts" />
                ) : (
                  <DataGrid
                    getRowId={(row) => row._id}
                    rows={productsData}
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
