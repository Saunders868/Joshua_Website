"use client";

import { useAppSelector } from "@/redux/hooks";
import { OrderResponseProduct, cartT } from "@/types";
import { useAxios } from "@/utils/useAxios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const Cart = ({ cart }: { cart: cartT }) => {
  //   const user = useAppSelector((state) => state.user.user);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const calculateCartTotal = () => {
      let cartTotal = 0;
      cart.products.forEach((product: any) => {
        cartTotal += product.price * product.quantity;
      });

      cartTotal = Number(cartTotal.toFixed(2));

      return cartTotal;
    };
    const calculatedCartTotal = calculateCartTotal();

    setCartTotal(calculatedCartTotal);
  }, [cartTotal, cart.products]);

  const products: OrderResponseProduct[] = cart.products;

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      type: "string",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      minWidth: 150,
      flex: 1,
    },
  ];

  return (
    <section className="cart">
      <h3>Cart:</h3>
      <DataGrid
        getRowId={(row) => row._id}
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
      />
      <div>
        <p>
          <b>Cart Total:</b> ${cartTotal} TTD
        </p>
      </div>
    </section>
  );
};

export default Cart;
