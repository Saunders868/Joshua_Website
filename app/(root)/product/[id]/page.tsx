import ProductPage from "@/components/ClientPages/ProductPage";
import { PRODUCTS_URL } from "@/constants";
import { ProductT } from "@/types";
import { axiosCall } from "@/utils/Axios";

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

  if (product as unknown as string == 'Not Found') {
    return "Product not found";
  }

  return (
    <main className="page">
      <ProductPage product={product} />
    </main>
  );
}
