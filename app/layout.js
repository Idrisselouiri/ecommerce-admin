import { Inter } from "next/font/google";
import Provider from "@components/Provider";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import Header from "@components/home/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Toaster />
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
