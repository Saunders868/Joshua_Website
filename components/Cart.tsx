"use client";

import { CARTS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const Cart = ({ id }: { id: string }) => {
    const user = useAppSelector((state) => state.user.user);
    const [cartTotal, setCartTotal] = useState(0);
    const { response, error, loading } = useAxios({
        url: `${CARTS_URL}/${id}`, token: {
            token: user.token,
            refreshToken: user.refreshToken
        }
    });

    useEffect(() => {
        const calculateCartTotal = () => {
            let cartTotal = 0;
            response?.data.products.forEach((product: any) => {
                cartTotal += product.price * product.quantity;
            });

            return cartTotal;
        }
        const calculatedCartTotal = calculateCartTotal();

        setCartTotal(calculatedCartTotal);
    }, [cartTotal, response?.data.products])

    const products: [] = response?.data.products;

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

    if (error) return "A network error occured. Please try again later...";

    if (loading) return "Loading...";

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
                <p><b>Cart Total:</b> ${cartTotal}</p>
            </div>
        </section>
    )
}

export default Cart;