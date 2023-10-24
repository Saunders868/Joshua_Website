"use client";

import Cart from "@/components/Cart";
import DashboardPageHeader from "@/components/DashboardPageHeader";
import UpdateOrder from "@/components/Forms/UpdateOrder";
import Loading from "@/components/Loading";
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

  if (loading) return <Loading />;

  return (
    <section>
      <DashboardPageHeader title="View Order" />
      <div className="admin__content single__admin__page">
        <h3>Customer: {response?.data.user.name}</h3>
        <p><b>Email:</b> <a href={`mailto:${response?.data.user.email}`}>{response?.data.user.email}</a></p>
        <p><b>Order Status:</b> {response?.data.isCompleted ? <span className="status completed">completed</span> : <span className="status process">pending</span>}</p>
        {/* cart that links to the actual cart */}
        <Cart id={response?.data.cart} />

        {/* update order status */}
        <UpdateOrder orderId={response?.data.id} isCompleted={response?.data.isCompleted as string} />
      </div>
    </section>
  );
};

export default Page;
