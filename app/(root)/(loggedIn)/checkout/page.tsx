"use client";

import Loading from "@/components/Loading";
import {
  BASE_URL,
  ORDERS_URL,
  PAYPAL_CAPTURE,
  PAYPAL_CLIENT_ID,
  USERS_URL,
} from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CartP, clearCart } from "@/redux/slices/cart.slice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ClientCart from "@/components/ClientCart";
import { handleAPIOrderCreate, paypalCreateOrder } from "@/utils/paypal.utis";
import { axiosCall } from "@/utils/Axios";
import { update } from "@/redux/slices/user.slice";
import Confirmation from "@/components/Confirmation";

const initialOptions = {
  clientId: PAYPAL_CLIENT_ID,
  "enable-funding": "venmo,card",
  "disable-funding": "paylater",
  "data-sdk-integration-source": "integrationbuilder_sc",
};

const Page = () => {
  const userData = useAppSelector((state) => state.user.user);
  const cartData = useAppSelector((state) => state.cart.products);
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [serializedData, setSerializedData] = useState<
    { product_id: string; quantity: number }[]
  >([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
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

  console.log(userData);

  let permissions: string[] = [];

  if (loading) return <Loading />;

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
          <b>Total Price:</b> ${totalPrice} TTD
        </h3>
      </section>

      <section>
        <div className="paypal__buttons">
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={{
                shape: "rect",
                layout: "vertical",
              }}
              createOrder={async () => {
                try {
                  const {
                    isSuccessful,
                    orderId,
                    permissions: orderPermissions,
                  } = await handleAPIOrderCreate({
                    userData,
                    serializedData,
                  });
                  permissions = orderPermissions;
                  return await paypalCreateOrder({
                    isSuccessful,
                    orderId,
                    userData,
                    permissions,
                  });
                } catch (error) {
                  console.error(error);
                }
              }}
              onApprove={async (data, actions) => {
                try {
                  const response = await fetch(
                    `${BASE_URL}${ORDERS_URL}/${PAYPAL_CAPTURE}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        orderId: data.orderID,
                      }),
                    }
                  );

                  const userUpdateResponse = await axiosCall({
                    method: "patch",
                    url: `${USERS_URL}/${userData.id}`,
                    payload: {
                      productPermissions: [
                        ...userData.productPermissions,
                        ...permissions,
                      ],
                    },
                  });

                  if (permissions) {
                    dispatch(update(permissions));
                  }

                  const orderData = await response.json();

                  const errorDetail = orderData?.details?.[0];

                  if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                    return actions.restart();
                  } else if (errorDetail) {
                    toast.error(
                      `${errorDetail.description} (${orderData.debug_id})`,
                      {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      }
                    );
                    throw new Error(
                      `${errorDetail.description} (${orderData.debug_id})`
                    );
                  } else {
                    const transaction =
                      orderData.purchase_units[0].payments.captures[0];

                    setShowConfirmation(true);
                    dispatch(clearCart());
                  }
                } catch (error) {
                  console.error(error);
                  toast.error(
                    `Sorry, your transaction could not be processed...${error}`,
                    {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    }
                  );
                }
              }}
            />
          </PayPalScriptProvider>
        </div>
      </section>

      {showConfirmation && (
        <Confirmation text="Order Completed Successfully!" location="/shop" />
      )}
    </main>
  );
};

export default Page;
