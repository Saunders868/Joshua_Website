"use client";

import Loading from "@/components/Loading";
import { CARTS_URL, ORDERS_URL, PAYPAL_CAPTURE, PAYPAL_CREATE } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { CartP } from "@/redux/slices/cart.slice";
import { axiosCall } from "@/utils/Axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const userData = useAppSelector((state) => state.user.user);
  const cartData = useAppSelector((state) => state.cart.products);
  // const cartId = useAppSelector((state) => state.cart.id);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [serializedData, setSerializedData] = useState<
    { product_id: string; quantity: number }[]
  >([]);

  useEffect(() => {
    let totalPrice: number = 0;

    cartData.forEach((product: CartP) => {
      totalPrice += product.price * product.quantity;
    });

    setTotalPrice(totalPrice);
    let serializedData: { product_id: string; quantity: number }[] = [];
    cartData.forEach((product: CartP) => {
      serializedData.push({
        product_id: product.product_id,
        quantity: product.quantity,
      });
    });

    setSerializedData(serializedData);
  }, [cartData]);

  // console.log(cartId);
  
 /*  const handleCartDelete = async () => {
    // delete cart on back to cart
    setLoading(true);
    const response = await axiosCall({
      method: "delete",
      url: `${CARTS_URL}/${cartId}`,
      payload: null,
      token: {
        token: userData.token,
        refreshToken: userData.refreshToken,
      },
    });

    setLoading(false);

    // handle the responses
    // or should i create the cart on order creation?????????
  }; */

  const handleCreateOrder = async () => {
    setLoading(true);
    const cartResponse = await axiosCall({
      method: "post",
      url: CARTS_URL,
      payload: {
        products: serializedData,
      },
      token: {
        token: userData.token,
        refreshToken: userData.refreshToken,
      },
    });

    console.log(cartResponse);

    if (cartResponse.status === 201) {
      const cartId = cartResponse.data.id;
      const orderResponse = await axiosCall({
        method: "post",
        url: ORDERS_URL,
        payload: {
          isCompleted: false,
          cartId: cartId,
        },
        token: {
          token: userData.token,
          refreshToken: userData.refreshToken,
        },
      });

      console.log(orderResponse);
      if (orderResponse.status === 200) {
        const orderId = orderResponse.data.id;
        const paypalCreateOrder = await axiosCall({
          method: "post",
          url: `${ORDERS_URL}/${PAYPAL_CREATE}`,
          payload: {
            cartId: cartId,
            orderId: orderId
          },
          token: {
            token: userData.token,
            refreshToken: userData.refreshToken,
          },
        });

        const paypalOrderId = paypalCreateOrder.data.id;
        const paypalUpdateOrder = await axiosCall({
          method: "post",
          url: `${ORDERS_URL}/${PAYPAL_CAPTURE}`,
          payload: {
            cartId: cartId,
            orderId: paypalOrderId
          },
          token: {
            token: userData.token,
            refreshToken: userData.refreshToken,
          },
        });
        console.log("create order paypal: ",paypalCreateOrder);
        console.log("update order paypal: ",paypalUpdateOrder);

        if (paypalCreateOrder.status === 201 && paypalUpdateOrder.status === 201) {
          console.log("create order paypal: ",paypalCreateOrder);
          console.log("update order paypal: ",paypalUpdateOrder);
          
        } else {
          toast.error("An network error occured when connecting to paypal. Please try again later", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        toast.error("An network error occured when placing your order. Please try again later", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

    } else {
      toast.error("A network error occured. Please try again later", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <main className="page checkout__page">
      <section>
        <h1>Checkout</h1>
      </section>

      <section>
        {/* <Link onClick={handleCartDelete} className="back" href="/shop"> */}
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
          Back to cart
        </Link>
      </section>

      <section></section>

      <section>
        <h3>
          <b>Total Price:</b> ${totalPrice} TTD
        </h3>
      </section>

      <section>
        <div className="button">
          <span className="btn" onClick={handleCreateOrder}>
            Place Order
          </span>
        </div>
      </section>
    </main>
  );
};

export default Page;
