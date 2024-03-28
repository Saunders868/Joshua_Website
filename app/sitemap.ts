import { FRONTEND_URL } from "@/constants";
import { ProductT } from "@/types";
import axios, { AxiosResponse } from "axios";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const instance = axios.create({
    withCredentials: true,
    timeout: 5000,
  });
  const response: AxiosResponse = await instance.request({
    url: "https://joshua-website-api.onrender.com/api/products",
    method: "get",
    withCredentials: true,
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
