import Header from "./components/ui/Header";
import "./globals.css";
import { ThemeProvider } from "./utils/theme-provider";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";

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
        className={`${poppins.variable} ${josefin.variable} max-w-screen overflow-x-hidden pl-5 pr-5 bg-gradient-to-b dark:bg-gradient-to-b from-gray-200 to-gray-300  dark:from-[#040f1e] dark:to-black duration-300 dark:text-gray-50 text-gray-950`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
