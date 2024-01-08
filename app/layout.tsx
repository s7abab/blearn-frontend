"use client";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import Loader from "./components/common/spinners/Loader";
import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from "./utils/theme-provider";
import { styles } from "./styles/style";
import { useEffect } from "react";
import Footer from "./components/common/ui/Footer";

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
        className={`${poppins.variable} ${josefin.variable} max-w-screen min-h-screen overflow-x-hidden pl-5 pr-5 bg-gray-50 ${styles.blue_gradient} `}
      >
        <Provider store={store}>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <Custom>{children}</Custom>
              <Footer />
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}

const Custom = ({ children }: any) => {
  const session = useSession();
  return session.status === "loading" ? <Loader /> : children;
};
