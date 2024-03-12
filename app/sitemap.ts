import { FRONTEND_URL, PRODUCTS_URL } from "@/constants";
import { ProductT } from "@/types";
import { axiosCall } from "@/utils/Axios";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await axiosCall({
    method: "get",
    url: PRODUCTS_URL,
    payload: null,
  });

  const products: ProductT[] = await response?.data;

  const productUrls =
    products?.map((product) => {
      return {
        url: `${FRONTEND_URL}/product/${product.id}`,
        lastModified: new Date(),
      };
    }) ?? [];

  return [
    {
      url: `${FRONTEND_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${FRONTEND_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${FRONTEND_URL}/shop
      `,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${FRONTEND_URL}/product`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...productUrls,
  ];
}
