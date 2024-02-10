"use client";

import Image from "next/image";
import Link from "next/link";
import { FRONTEND_URL } from "@/constants";
import Button from "@/components/Button";
import Counter from "@/components/Counter";
import { ProductT } from "@/types";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addProduct } from "@/redux/slices/cart.slice";
import Loading from "../Loading";

const ProductPage = ({ product }: { product: ProductT }) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const cartItemsLength = cart.products.filter(
    (prod) => product.id == prod.product_id
  ).length;

  const virtualProductAlreadyInCart = cartItemsLength > 0 ? true : false;

  const handleProductAdd = (product: {
    product_id: string;
    quantity: number;
    title: string;
    image: string;
    desc: string;
    price: number;
  }) => {
    setLoading(true);
    dispatch(
      addProduct({
        product_id: product.product_id,
        quantity: product.quantity,
        title: product.title,
        image: product.image,
        desc: product.desc,
        price: product.price,
      })
    );
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="product__page">
      <div className="product__page__media">
        <Link href={`${FRONTEND_URL}/shop`} className="back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
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
        </Link>
        <Image
          height={100}
          width={100}
          alt={product.title}
          src={
            product.image ||
            "https://images.unsplash.com/photo-1633783714421-332b7f929148?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bm8lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          }
        />
      </div>
      <div className="product__page__content">
        <div className="text">
          <h1>{product.title}</h1>
          <h3>{product.desc}</h3>
          <h3>
            <b>${product.price}</b>
          </h3>
        </div>
        <div className="cart__info">
          {product.type === "simple" ? (
            <div className="counter">
              <Counter count={count} setCount={setCount} />
            </div>
          ) : null}
          {virtualProductAlreadyInCart ? (
            <div title="item already in cart" className="button">
              <Button disabled link="/cart" text="Add to cart" />
            </div>
          ) : (
            <div
              onClick={() =>
                handleProductAdd({
                  product_id: product.id!,
                  quantity: count,
                  title: product.title!,
                  image: product.image!,
                  desc: product.desc!,
                  price: product.price!,
                })
              }
              className="button"
            >
              <Button link="/cart" text="Add to cart" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
