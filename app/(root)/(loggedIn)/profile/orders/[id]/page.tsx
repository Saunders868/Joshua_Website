"use client";

import Cart from "@/components/Cart";
import DashboardPageHeader from "@/components/DashboardPageHeader";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { ORDERS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user.user);
  const { response, error, loading } = useAxios({
    url: `${ORDERS_URL}/${id}`,
    token: {
      token: user.token,
      refreshToken: user.refreshToken,
    },
  });

  if (error) return <Error />;

  if (loading) return <Loading />;

  return (
    <section>
      <DashboardPageHeader title="Order" />
      <div className="admin__content single__admin__page">
        <h3>Order Id: {response?.data.id}</h3>
        <p>
          <b>Email:</b>{" "}
          <a href={`mailto:${response?.data.user.email}`}>
            {response?.data.user.email}
          </a>
        </p>
        <p>
          <b>Order Status:</b>{" "}
          {response?.data.isCompleted ? (
            <span className="status completed">completed</span>
          ) : (
            <span className="status process">pending</span>
          )}
        </p>
        <Cart id={response?.data.cart} />
      </div>
    </section>
  );
};

export default Page;
