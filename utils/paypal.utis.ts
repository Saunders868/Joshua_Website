import { BASE_URL, ORDERS_URL, PAYPAL_CREATE } from "@/constants";
import { axiosCall } from "./Axios";
import { toast } from "react-toastify";
import { OrderResponseProduct } from "@/types";

export const handleAPIOrderCreate = async ({
  userData,
  serializedData,
}: {
  userData: any;
  serializedData: { product_id: string; quantity: number }[];
}) => {
  let isSuccessful = false;
  let permissions: string[] = [];

  const orderResponse = await axiosCall({
    method: "post",
    url: ORDERS_URL,
    payload: {
      isCompleted: false,
      cart: {
        products: serializedData,
      },
    },
  });

  if (orderResponse.status === 200) {
    const orderId = orderResponse.data.id;
    isSuccessful = true;

    let products: OrderResponseProduct[] = orderResponse.data.cart.products;
    let virtualProducts = products.filter(
      (product) => product.type == "virtual"
    );

    if (virtualProducts.length > 0) {
      for (let index = 0; index < virtualProducts.length; index++) {
        const elementToAdd: OrderResponseProduct = virtualProducts[index];
        let title = elementToAdd.title;
        permissions.push(title);
      }
    }

    return {
      isSuccessful,
      orderId,
      permissions,
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
      permissions,
    };
  }
};

export const paypalCreateOrder = async ({
  isSuccessful,
  orderId,
  userData,
  permissions,
}: {
  isSuccessful: boolean;
  orderId: string;
  userData: any;
  permissions: string[];
}) => {
  if (isSuccessful) {
    const response = await fetch(`${BASE_URL}${ORDERS_URL}/${PAYPAL_CREATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
        permissions: permissions,
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
