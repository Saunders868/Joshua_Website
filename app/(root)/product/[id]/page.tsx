import ProductPage from "@/components/ClientPages/ProductPage";
import { FRONTEND_URL, PRODUCTS_URL } from "@/constants";
import { ProductT } from "@/types";
import { axiosCall } from "@/utils/Axios";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const id = params.id;

    const product = await axiosCall({
      method: "get",
      url: `${PRODUCTS_URL}/${id}`,
      payload: null,
    });

    if (!product) {
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };
    }

    return {
      title: product.data.title,
      description: `${product.data.desc.substring(0, 155)}...`,
      alternates: {
        canonical: `/product/${id}`,
      },
      twitter: {
        card: "summary_large_image",
        site: `${FRONTEND_URL}/product/${id}`,
        title: product.data.title,
        description: `${product.data.desc.substring(0, 155)}...`,
      },
      openGraph: {
        title: product.data.title,
        description: `${product.data.desc.substring(0, 155)}...`,
        type: "website",
        url: `${FRONTEND_URL}/product/${id}`,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}

export async function generateStaticParams() {
  const response = await axiosCall({
    method: "get",
    url: PRODUCTS_URL,
    payload: null,
  });

  const products = await response.data;

  if (!products) return [];

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
  //   return "Not Found";
  // }

  const product = response.data;

  return product;
}

export default async function Page({ params }: { params: { id: string } }) {
  const product: ProductT = await getData(params.id);

  if ((product as unknown as string) == "Not Found") {
    return "Product not found";
  }

  return (
    <main className="page">
      <ProductPage product={product} />
    </main>
  );
}
