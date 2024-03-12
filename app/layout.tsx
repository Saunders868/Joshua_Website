import Header from "@/components/Header";
import "./globals.scss";
import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { Providers } from "@/redux/provider";
import ToastProvider from "@/components/toast.provider";
import Footer from "@/components/Footer";
import { FRONTEND_URL } from "@/constants";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={hankenGrotesk.className}>
        <Providers>
          <ToastProvider>
            <div className="flex">
              <Header />
              {children}
              <Footer />
            </div>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
