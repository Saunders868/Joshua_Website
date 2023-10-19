"use client";

import { CARTS_URL } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { useAxios } from "@/utils/useAxios";

const Cart = ({ id }: { id: string }) => {
    const user = useAppSelector((state) => state.user.user);
    const { response, error, loading } = useAxios({
        url: `${CARTS_URL}/${id}`, token: {
            token: user.token,
            refreshToken: user.refreshToken
        }
    });

    if (error) return "A network error occured. Please try again later...";

    if (loading) return "Loading...";

    return (
        <>
            {response?.data.products.map((product: any) => (
                <div key={product.product_id}>
                    <p>Product: {product.title}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: ${product.price}</p>
                    <p>Product total: ${product.price * product.quantity}</p>
                </div>
            ))}
        </>
    )
}

export default Cart;