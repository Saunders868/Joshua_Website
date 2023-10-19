"use client";

import Cart from "@/components/Cart";
import DashboardPageHeader from "@/components/DashboardPageHeader";
import { CARTS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user.user);
  const { response, error, loading } = useAxios({
    url: `${CARTS_URL}/${id}`, token: {
      token: user.token,
      refreshToken: user.refreshToken
    }
  });

  if (error) return "A network error occured. Please try again later...";

  if (loading) return "Loading...";
  return (
    <section>
      <DashboardPageHeader title="View Cart" />
      <div className="admin__content">
        <h3>Customer: {response?.data.userId.name}</h3>
        <Cart id={response?.data.id} />
      </div>
    </section>
    );
};

export default Page;
