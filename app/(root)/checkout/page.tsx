"use client";

import Loading from "@/components/Loading";
import { PAYPAL_CLIENT_ID } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CartP } from "@/redux/slices/cart.slice";
import Link from "next/link";
import { useEffect, useState } from "react";
import ClientCart from "@/components/ClientCart";
import Confirmation from "@/components/Confirmation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PaypalButtons from "@/components/PaypalButtons";

const Page = () => {
  const { data: session, update } = useSession();
  const cartData = useAppSelector((state) => state.cart.products);
  const { push } = useRouter();
  const [clientLoading, setClientLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [serializedData, setSerializedData] = useState<
    { product_id: string; quantity: number }[]
  >([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderID, setOrderID] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    let serializedData: { product_id: string; quantity: number }[] = [];
    cartData.forEach((product: CartP) => {
      serializedData.push({
        product_id: product.product_id,
        quantity: product.quantity,
      });
    });

    setSerializedData(serializedData);
  }, [cartData]);

  useEffect(() => {
    if (session != null) {
      const hasMatchingTitle = session?.user?.productPermissions.some(
        (string: string) => cartData.some((object) => object.title === string)
      );
      if (hasMatchingTitle) {
        push("/profile/downloads");
      }
    }
    setClientLoading(false);
  }, [session]);

  let permissions: string[] = [];

  if (loading || clientLoading) return <Loading />;

  return (
    <main className="page checkout__page">
      <section>
        <h1>Checkout</h1>
      </section>

      <section>
        <Link className="back" href="/cart">
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
          Back to cart
        </Link>
      </section>

      <section>
        <ClientCart setLoading={setLoading} setTotalPrice={setTotalPrice} />
      </section>

      <section>
        <h3>
          <b>Total Price:</b> ${totalPrice} USD
        </h3>
      </section>

      <section>
        <div className="paypal__buttons">
          <PaypalButtons
            serializedData={serializedData}
            permissions={permissions}
            setOrderID={setOrderID}
            setShowConfirmation={setShowConfirmation}
            dispatch={dispatch}
            cartData={cartData}
            session={session}
            update={update}
          />
        </div>
      </section>

      {showConfirmation && (
        <Confirmation
          text="Order Completed Successfully!"
          location={`/order-received/${orderID}`}
        />
      )}
    </main>
  );
};

export default Page;
