"use client";

import DashboardPageHeader from "@/components/DashboardPageHeader";
import NoData from "@/components/NoData";
import ProductsTable from "@/components/Tables/ProductsTable";
import { PRODUCTS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";
import Link from "next/link";

const Page = () => {
  const userData = useAppSelector((state) => state.user);
  
  const { loading, response, error } = useAxios({
    url: PRODUCTS_URL,
    token: {
      token: userData.token,
      refreshToken: userData.refreshToken,
    },
  });
  
  return (
    <section>
      <DashboardPageHeader title="Products" />
      <p>create product, update product, delete product, update product</p>

      <div className="admin__content">
        <Link href={"/admin/products/create"}>Create</Link>
      </div>

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
                  <ProductsTable dataArray={response?.data} />
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
