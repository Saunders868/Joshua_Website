import Header from "@/components/Header";
import "./globals.scss";
import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { Providers } from "@/redux/provider";
import ToastProvider from "@/components/toast.provider";
import Footer from "@/components/Footer";
import { FRONTEND_URL } from "@/constants";
import { AuthContext } from "@/components/AuthProvider/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(FRONTEND_URL),
  title: {
    default: "Joshua Greene",
    template: `Joshua Greene | %s`,
  },
  description: "Trinidadian Food at Its Best: Joshua Greene's Expert Creations",
  verification: {
    google: "zVh70hMrBq_x1MVsKO39HwQuBFgInxjX6njQUp6cvCk",
  },
};

const googleJsonLd = {
  "@context": "http://www.schema.org",
  "@type": "Person",
  name: "Joshua Greene",
  alternateName: "joshuagreenee",
  nationality: "Trinidadian",
  birthPlace: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Princes Town",
      addressRegion: "Caribbean",
      addressCountry: "Trinidad",
    },
  },
  gender: "Male",
  description: "Trinidadian Food at Its Best: Joshua Greene's Expert Creations",
  disambiguatingDescription:
    "Trinidadian Food at Its Best: Joshua Greene's Expert Creations",
  jobTitle: "Chef",
  url: "https://joshua-website.vercel.app/",
  image:
    "https://joshua-website.vercel.app/opengraph-image.png?0e7a9af85d769048",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Princes Town",
    addressRegion: "Caribbean",
    addressCountry: "Trinidad",
  },
  sameAs: ["https://www.instagram.com/joshuagreenee/"],
};

const schemaORGJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateCreated: "2024-10-23T12:34:00-05:00",
  dateModified: "2024-10-26T14:53:00-05:00",
  mainEntity: {
    "@type": "Person",
    name: "Joshua Greene",
    description:
      "Trinidadian Food at Its Best: Joshua Greene's Expert Creations",
    alternateName: "joshuagreenee",
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/FollowAction",
        userInteractionCount: 1,
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: 5,
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/BefriendAction",
        userInteractionCount: 5,
      },
    ],
    agentInteractionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/WriteAction",
      userInteractionCount: 4,
    },
    image:
      "https://joshua-website.vercel.app/opengraph-image.png?0e7a9af85d769048",
    sameAs: ["https://www.instagram.com/joshuagreenee/"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(googleJsonLd) }}
          id="google-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaORGJsonLd) }}
          id="schemaORG-jsonld"
        />
        <GoogleAnalytics gaId="G-V2K1YJNMYZ" />
      </head>
      <body className={hankenGrotesk.className}>
        <AuthContext>
          <Providers>
            <ToastProvider>
              <div className="flex">
                <Header />
                {children}
                <Footer />
              </div>
            </ToastProvider>
          </Providers>
        </AuthContext>
        <SpeedInsights />
      </body>
    </html>
  );
}
