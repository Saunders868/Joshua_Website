"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { ORDERS_URL } from "@/constants";
import { useAxios } from "@/utils/useAxios";
import { useParams } from "next/navigation";
import React from "react";
import moment from "moment";
import Cart from "@/components/Cart";
import Button from "@/components/Button";

const Page = () => {
  const { id } = useParams();
  const { response, error, loading } = useAxios({
    url: `${ORDERS_URL}/${id}`,
  });

  if (error) return <Error />;

  if (loading) return <Loading />;
  return (
    <main className="page order_complete__page">
      <section>
        <h1>Order Complete</h1>
      </section>

      <section>
        <h3>
          <b>Customer:</b> {response?.data.user.name}
        </h3>
        <p>
          <b>Email:</b>{" "}
          <a href={`mailto:${response?.data.user.email}`}>
            {response?.data.user.email}
          </a>
        </p>
        <p>
          <b>Order Placed on:</b>{" "}
          {moment(response?.data.createdAt).format("MMM Do YYYY")}
        </p>
      </section>
      <section>
        <Cart cart={response?.data.cart} />
      </section>
      <section>
        <p>
          <b>Click the button below to access "The Flavor Journal":</b>{" "}
        </p>
        <div className="book_link">
          <Button fill link="/profile/downloads" text="Access Book" />
        </div>
      </section>
    </main>
  );
};

export default Page;
