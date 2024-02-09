import { BASE_URL, CARTS_URL, ORDERS_URL, PAYPAL_CREATE } from "@/constants";
import { axiosCall } from "./Axios";
import { toast } from "react-toastify";

export const handleAPIOrderCreate = async ({
  userData,
  serializedData,
}: {
  userData: any;
  serializedData: { product_id: string; quantity: number }[];
}) => {
  let isSuccessful = false;

  const orderResponse = await axiosCall({
    method: "post",
    url: ORDERS_URL,
    payload: {
      isCompleted: false,
      cart: {
        products: serializedData,
      },
    },
    token: {
      token: userData.token,
      refreshToken: userData.refreshToken,
    },
  });

  if (orderResponse.status === 200) {
    const orderId = orderResponse.data.id;
    isSuccessful = true;
    return {
      isSuccessful,
      orderId,
    };
  } else {
    toast.error(
      "An network error occured when placing your order. Please try again later",
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
    return {
      isSuccessful,
    };
  }
};

export const paypalCreateOrder = async ({
  isSuccessful,
  orderId,
}: {
  isSuccessful: boolean;
  orderId: string;
}) => {
  if (isSuccessful) {
    const response = await fetch(`${BASE_URL}${ORDERS_URL}/${PAYPAL_CREATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
      }),
    });

    const orderData = await response.json();

    if (orderData.id) {
      return orderData.id;
    } else {
      const errorDetail = orderData?.details?.[0];
      const errorMessage = errorDetail
        ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
        : JSON.stringify(orderData);

      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw new Error(errorMessage);
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
    throw new Error(
      "An network error occured when placing your order. Please try again later"
    );
  }
};
