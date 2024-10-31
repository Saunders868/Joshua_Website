import ProductPage from "@/components/ClientPages/ProductPage";
import { FRONTEND_URL, PRODUCTS_URL } from "@/constants";
import { ProductT } from "@/types";
import { axiosCall } from "@/utils/Axios";
import { getProductData } from "@/utils/utils";
import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const id = params.id;

    const product = await getProductData({ id: id });

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
    console.log("Error: ", error);

    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}

async function getData(id: string) {
  const response = await getProductData({ id: id });

  if (response.status != 200) {
    return "Not Found";
  }

  const product = response.data;

  return product;
}

export default async function Page({ params }: { params: { id: string } }) {
  const product: ProductT = await getData(params.id);

  const currentURL = `${FRONTEND_URL}/product/${params.id}`;

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    mainEntity: {
      "@type": "Book",
      author: "Joshua Greene",
      bookFormat: "https://schema.org/EBook",
      datePublished: "1991-05-01",
      inLanguage: "English",
      name: "The Flavor Journal",
      numberOfPages: "224",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        price: "9.99",
        priceCurrency: "USD",
      },
    },
  };

  const googleJsonLD = {
    "@context": "https://schema.org",
    "@type": "DataFeed",
    dataFeedElement: [
      {
        "@context": "https://schema.org",
        "@type": "Book",
        "@id": currentURL,
        url: currentURL,
        name: product.title,
        inLanguage: "en",
        author: {
          "@type": "Person",
          name: "Joshua Greene",
        },
        workExample: [
          {
            "@type": "Book",
            "@id": currentURL,
            bookEdition: "1st Edition",
            bookFormat: "https://schema.org/EBook",
            inLanguage: "en",
            potentialAction: {
              "@type": "ReadAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: currentURL,
                actionPlatform: ["https://schema.org/DesktopWebPlatform"],
              },
              expectsAcceptanceOf: {
                "@type": "Offer",
                category: "purchase",
                price: 9.99,
                priceCurrency: "USD",
              },
            },
          },
        ],
      },
    ],
  };

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
      <script
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLD),
        }}
      />
      <script
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(googleJsonLD),
        }}
      />
    </main>
  );
}
