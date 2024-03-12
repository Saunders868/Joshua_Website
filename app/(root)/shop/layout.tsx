import { Metadata } from "next";
import Page from "./page";
import { FRONTEND_URL } from "@/constants";

export const metadata: Metadata = {
  title: "Shop",
  alternates: {
    canonical: "/shop",
  },
  twitter: {
    card: "summary_large_image",
    site: `${FRONTEND_URL}/shop`,
  },
  openGraph: {
    type: "website",
    url: `${FRONTEND_URL}/shop`,
  },
};
export default Page;
