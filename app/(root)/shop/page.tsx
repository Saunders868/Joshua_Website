"use client";

import Card from "@/components/Card";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { PRODUCTS_URL } from "@/constants";
import { ProductT } from "@/types";
import { useAxios } from "@/utils/useAxios";

const Page = () => {
  const { loading, response, error } = useAxios({
    url: PRODUCTS_URL,
  });

  const productsData: ProductT[] = response?.data;

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <main className="shop">
      {productsData.map((product) => (
        <Card key={product._id} product={product} />
      ))}
    </main>
  );
};

export default Page;
