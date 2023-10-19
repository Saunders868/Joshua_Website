"use client";

import Cart from "@/components/Cart";
import DashboardPageHeader from "@/components/DashboardPageHeader";
import { ORDERS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user.user);
  const { response, error, loading } = useAxios({
    url: `${ORDERS_URL}/${id}`, token: {
      token: user.token,
      refreshToken: user.refreshToken
    }
  });

  if (error) return "A network error occured. Please try again later...";

  if (loading) return "Loading...";

  return (
    <section>
      <DashboardPageHeader title="View Order" />
      <div className="admin__content">
        <h3>Customer: {response?.data.user.name}</h3>
        <p>Email: <a href={`mailto:${response?.data.user.email}`}>{response?.data.user.email}</a></p>
        <p>status: {response?.data.isCompleted ? "completed" : "pending"}</p>
        {/* cart that links to the actual cart */}
        <Cart id={response?.data.crtId} />
      </div>
    </section>
  );
};

export default Page;
