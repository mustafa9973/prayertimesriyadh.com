import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import('./(components)/navbar/navbar'))
const Footer = dynamic(() => import('./(components)/footer/footer'))

const inter = Amiri({ 
  subsets: ["arabic"],
  weight:"400"
  
 });

export const metadata: Metadata = {
  title: "اوقات الصلاة في مدينة الرياض",
  description: "اوقات الصلاة في مدينة الرياض",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="ar" dir="rtl">


      <body className={`bg-gray-100 ${inter.className}`}>
      <Navbar></Navbar>
        <div className="xs:px-2 xs:py-2 sm:p-6">

        {children}
        </div>
        <Footer></Footer>
        </body>
    </html>

  );
}
