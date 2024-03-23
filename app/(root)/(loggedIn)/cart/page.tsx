"use client";

import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import ClientCart from "@/components/ClientCart";

const Page = () => {
  const cartData = useAppSelector((state) => state.cart.products);
  const { push } = useRouter();
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCreateCart = async () => {
    push("/checkout");
  };

  if (loading) return <Loading />;

  if (cartData.length === 0) {
    return (
      <main className="page cart__page">
        <p>You have not added any products to the cart as yet...</p>
        <p>
          <Link href={"/shop"}>Start shopping!</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="page cart__page">
      <section>
        <h1>Cart</h1>
      </section>

      <section>
        <Link className="back" href="/shop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <g id="evaArrowBackOutline0">
              <g id="evaArrowBackOutline1">
                <path
                  id="evaArrowBackOutline2"
                  fill="currentColor"
                  d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2Z"
                />
              </g>
            </g>
          </svg>
          Continue Shopping
        </Link>
      </section>

      <section>
        <ClientCart setLoading={setLoading} setTotalPrice={setTotalPrice} />
      </section>

      <section>
        <h3>
          <b>Total Price:</b> ${totalPrice} TTD
        </h3>
      </section>

      <section>
        <div className="button">
          <span className="btn" onClick={handleCreateCart}>
            Proceed to Checkout
          </span>
        </div>
      </section>
    </main>
  );
};

export default Page;
