import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { handleAPIOrderCreate, paypalCreateOrder } from "@/utils/paypal.utis";
import {
  FRONTEND_URL,
  ORDERS_URL,
  PAYPAL_CAPTURE,
  PAYPAL_CLIENT_ID,
  USERS_URL,
} from "@/constants";
import { emailTemplate, sendEmail } from "@/utils/utils";
import { toast } from "react-toastify";
import { SetStateAction } from "react";
import { axiosCall } from "@/utils/Axios";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { CartP, clearCart } from "@/redux/slices/cart.slice";
import { Session } from "next-auth";
import { UpdateSession } from "next-auth/react";

const initialOptions = {
  clientId: PAYPAL_CLIENT_ID,
  "enable-funding": "venmo,card",
  "disable-funding": "paylater",
  currency: "USD",
  components: "buttons",
  "data-sdk-integration-source": "integrationbuilder_sc",
};

const PaypalButtons = ({
  serializedData,
  permissions,
  setOrderID,
  setShowConfirmation,
  dispatch,
  cartData,
  session,
  update,
}: {
  serializedData: { product_id: string; quantity: number }[];
  permissions: string[];
  setOrderID: React.Dispatch<SetStateAction<string>>;
  setShowConfirmation: React.Dispatch<SetStateAction<boolean>>;
  dispatch: Dispatch<AnyAction>;
  cartData: CartP[];
  session: Session | null;
  update: UpdateSession;
}) => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{
          shape: "rect",
          layout: "vertical",
          color: "black",
          label: "pay",
        }}
        createOrder={async () => {
          try {
            const {
              isSuccessful,
              orderId,
              permissions: orderPermissions,
            } = await handleAPIOrderCreate({
              serializedData,
            });
            permissions = orderPermissions;
            setOrderID(orderId);

            return await paypalCreateOrder({
              isSuccessful,
              orderId,
              permissions,
            });
          } catch (error) {
            console.error(error);
          }
        }}
        onApprove={async (data, actions) => {
          try {
            const response = await fetch(
              `${FRONTEND_URL}/${ORDERS_URL}/${PAYPAL_CAPTURE}`,
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

            if (response.status != 201) {
              throw new Error("Error creating paypal order.");
            }

            const userUpdateResponse = await axiosCall({
              method: "PATCH",
              url: `${USERS_URL}/${session?.user.id}`,
              payload: {
                productPermissions: [
                  ...session?.user.productPermissions,
                  ...permissions,
                ],
              },
            });

            if (userUpdateResponse.status != 200) {
              throw new Error("Error updating user permissions.");
            }

            await sendEmail({
              username: session?.user.name,
              email: session?.user.email,
              body: emailTemplate({
                userName: session?.user.name,
                products: cartData,
                orderLink: `${FRONTEND_URL}/profile/downloads`,
              }),
              subject: "Order Completed Successfully!",
            });

            await sendEmail({
              username: "Josh",
              email: "saundersdaniel.10@gmail.com",
              body: "You know what it is.",
              subject: "Another day another dollar 💰💵🏦!",
            });

            await update({
              ...session?.user,
              productPermissions: [
                ...session?.user.productPermissions,
                permissions,
              ],
            });

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
  );
};

export default PaypalButtons;
