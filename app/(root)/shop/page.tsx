"use client";

import Card from "@/components/Card";
import { PRODUCTS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { ProductT } from "@/types";
import { useAxios } from "@/utils/useAxios";

const Page = () => {
  const userData = useAppSelector((state) => state.user);
  
  const { loading, response, error } = useAxios({
    url: PRODUCTS_URL,
    token: {
      token: userData.token,
      refreshToken: userData.refreshToken,
    },
  });

  const productsData: ProductT[] = response?.data;

  if (loading) return "Loading...";

  if (error) return "A network error occured. Please try again later...";

  return (
    <section className="shop">
      {productsData.map((product) => (
        <Card key={product._id} product={product} />
      ))}
    </section>
  )
}

export default Page