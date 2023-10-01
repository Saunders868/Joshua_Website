import { PRODUCTS_URL } from "@/constants";
import { ProductT } from "@/types";
import { axiosCall } from "@/utils/Axios";
import Image from "next/image";

export async function generateStaticParams() {
  const response = await axiosCall({
    method: "get",
    url: PRODUCTS_URL,
    payload: null,
  });

  const products = response.data;

  return products.map((product: ProductT) => ({
    id: product.id,
  }));
}

async function getData(id: string) {
  const response = await axiosCall({
    method: "get",
    url: `${PRODUCTS_URL}/${id}`,
    payload: null,
  });

  // if (response.status != 200) {
  //   throw new Error('Failed to find product')
  // }

  const product = response.data;

  return product;
}

export default async function Page({ params }: { params: { id: string } }) {
  const product: ProductT = await getData(params.id);
  
  return (
    <main className="page">
      <div className="product__page">
        <div className="product__page__media">
          <Image height={100} width={100} alt={product.title} src={product.image || "https://images.unsplash.com/photo-1633783714421-332b7f929148?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bm8lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"}  />
        </div>
        <div className="product__page__content">
          <div className="text">
            <h1>{product.title}</h1>
            <h3>{product.desc}</h3>
            <h3>{product.price}</h3>
          </div>
          <div className="payment">
            
          </div>
        </div>
      </div>
    </main>
  );
}
