"use client";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} max-w-screen h-full pl-5 pr-5 bg-gradient-to-b  from-[#040f1e] to-black duration-300 text-gray-50`}
      >
        <Provider store={store}>
          <SessionProvider>
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
