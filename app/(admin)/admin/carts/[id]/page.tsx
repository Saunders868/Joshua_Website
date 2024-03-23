"use client";

import Cart from "@/components/Cart";
import DashboardPageHeader from "@/components/DashboardPageHeader";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { CARTS_URL } from "@/constants";
import { useAxios } from "@/utils/useAxios";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const { response, error, loading } = useAxios({
    url: `${CARTS_URL}/${id}`,
  });

  if (error) return <Error />;

  if (loading) return <Loading />;
  return (
    <section>
      <DashboardPageHeader title="View Cart" />
      <div className="admin__content single__admin__page">
        <h3>Customer: {response?.data.userId.name}</h3>
        {/* <Cart id={response?.data.id} /> */}
      </div>
    </section>
  );
};

export default Page;
