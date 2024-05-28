import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import PathnameWrapper from "components/PathnameWrapper";

import { ToastContainer } from 'react-toastify';


const optimaFont = localFont({
  src: "../../public/font/OPTIMA.woff",
})

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
      <body className={`
        ${optimaFont.className}`}>
      <PathnameWrapper>
        {children}
        <ToastContainer />

        </PathnameWrapper>

      </body>
    </html>
  );
}
