"use client";

import Cart from "@/components/Cart";
import DashboardPageHeader from "@/components/DashboardPageHeader";
import Error from "@/components/Error";
import UpdateOrder from "@/components/Forms/UpdateOrder";
import Loading from "@/components/Loading";
import { ORDERS_URL } from "@/constants";
import { useAxios } from "@/utils/useAxios";
import { useParams } from "next/navigation";
import moment from "moment";

const Page = () => {
  const { id } = useParams();
  const { response, error, loading } = useAxios({
    url: `${ORDERS_URL}/${id}`,
  });

  if (error) return <Error />;

  if (loading) return <Loading />;

  return (
    <section>
      <DashboardPageHeader title="View Order" />
      <div className="admin__content single__admin__page">
        <h3>Customer: {response?.data.user.name}</h3>
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
        <p>
          <b>Order Placed on:</b>{" "}
          {moment(response?.data.createdAt).format("MMM Do YY")}
        </p>
        {/* cart that links to the actual cart */}
        <Cart cart={response?.data.cart} />

        {/* update order status */}
        <UpdateOrder
          orderId={response?.data.id}
          isCompleted={response?.data.isCompleted as string}
        />
      </div>
    </section>
  );
};

export default Page;
