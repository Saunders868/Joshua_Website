import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CartP, removeProduct } from "@/redux/slices/cart.slice";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import Image from "next/image";
import React, { SetStateAction, useEffect } from "react";

const ClientCart = ({ setLoading, setTotalPrice }:
    { 
        setLoading: React.Dispatch<SetStateAction<boolean>>, 
        setTotalPrice: React.Dispatch<SetStateAction<number>> 
    }) => {
    const cartData = useAppSelector((state) => state.cart.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let totalPrice: number = 0;

        cartData.forEach((product: CartP) => {
            totalPrice += product.price * product.quantity;
        });

        totalPrice = Number(totalPrice.toFixed(2));

        setTotalPrice(totalPrice);
    }, [cartData, setTotalPrice]);

    const handleProductRemove = (product: { product_id: string }) => {
        setLoading(true);
        dispatch(
            removeProduct({
                product_id: product.product_id,
            })
        );
        setLoading(false);
    };

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
            // renderCell: (params) => {
            //   setCount(params.value);
            //   return (
            //     <div>
            //       <Counter count={count} setCount={setCount} />
            //     </div>
            //   );
            // },
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
    return (
        <>
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
        </>
    )
}

export default ClientCart