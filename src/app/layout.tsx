import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import localFont from "next/font/local";

import "./globals.css";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

// const optima = localFont({
//   src: [
//     {
//       path: '../../public/fonts/OPTIMA.TTF',  // Ensure the path starts with a slash to point to the public directory
//       weight: '700',
//     },
//   ],
//   variable: '--font-optima',
// });

export const metadata: Metadata = {
  title: "Interior Film",
  description: "Generated by Interior Film",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${inter.className}`}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
