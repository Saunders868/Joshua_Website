import Header from "@/components/Header";
import "./globals.scss";
import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { Providers } from "@/redux/provider";
import ToastProvider from "@/components/toast.provider";
import Footer from "@/components/Footer";

const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Joshua Greene",
  description: "Trinidadian Food at Its Best: Joshua Green's Expert Creations",
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
