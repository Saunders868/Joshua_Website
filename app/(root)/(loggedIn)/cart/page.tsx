"use client";

import Counter from "@/components/Counter";
import { CARTS_URL } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CartP, removeProduct, setCart } from "@/redux/slices/cart.slice";
import { axiosCall } from "@/utils/Axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const userData = useAppSelector((state) => state.user.user);
  const cartData = useAppSelector((state) => state.cart.products);
  const { push } = useRouter();
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [serializedData, setSerializedData] = useState<
    { product_id: string; quantity: number }[]
  >([]);
  const dispatch = useAppDispatch();

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

  const handleProductRemove = (product: { product_id: string }) => {
    dispatch(
      removeProduct({
        product_id: product.product_id,
      })
    );
  };

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

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Name",
      type: "string",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "image",
      headerName: "Image",
      type: "string",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Image height={40} width={40} src={params.value} alt="none" />
          </div>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      minWidth: 150,
      flex: 1,
      /* update count to allow users to add to cart */
      renderCell: (params) => {
        setCount(params.value);
        return (
          <div>
            <Counter count={count} setCount={setCount} />
          </div>
        );
      },
    },
    {
      field: "product_id",
      headerName: "Remove",
      renderCell: (params) => {
        return (
          <div
            className="remove"
            onClick={() => handleProductRemove({ product_id: params.value })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 16 16"
            >
              <path
                fill="red"
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
              />
            </svg>
          </div>
        );
      },
    },
  ];

  const handleCreateCart = async () => {
    setLoading(true);
    const response = await axiosCall({
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

    if (response.status === 201) {
      push("/checkout");
      dispatch(setCart({ product_id: response.data }));
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

    console.log(response);
  };

  if (loading) return "Loading...";

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
        <DataGrid
          getRowId={(row) => row.product_id}
          rows={cartData}
          rowHeight={60}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
        />
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
