import ProductPage from "@/components/ClientPages/ProductPage";
import { FRONTEND_URL, PRODUCTS_URL } from "@/constants";
import { ProductT } from "@/types";
import { axiosCall } from "@/utils/Axios";
import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  console.log("Params: ", params);
  console.log("The url: ", `${FRONTEND_URL}/product/${params.id}`);
  try {
    const id = params.id;

    const product = await axiosCall({
      method: "get",
      url: `${PRODUCTS_URL}/${id}`,
      payload: null,
    });
    console.log("Product: ", product);

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
        images: [`${product.data.image}`],
      },
      openGraph: {
        title: product.data.title,
        description: `${product.data.desc.substring(0, 155)}...`,
        type: "website",
        url: `${FRONTEND_URL}/product/${id}`,
        images: [`${product.data.image}`],
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

export const revalidate = 3600;

async function getData(id: string) {
  const response = await axiosCall({
    method: "get",
    url: `${PRODUCTS_URL}/${id}`,
    payload: null,
  });

  if (response.status != 200) {
    return "Not Found";
  }

  const product = response.data;

  return product;
}

export default async function Page({ params }: { params: { id: string } }) {
  const product: ProductT = await getData(params.id);

  if ((product as unknown as string) == "Not Found") {
    return (
      <div className="no-data">
        <div>
          <p>Product not found...</p>
        </div>

        <div>
          <Link
            style={{
              color: "black",
            }}
            href={"/shop"}
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="page">
      <ProductPage product={product} />
    </main>
  );
}
