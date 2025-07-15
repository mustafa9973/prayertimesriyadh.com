import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";

import dynamic from "next/dynamic";
import Script from "next/script";

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
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9313620054511459"

     crossOrigin="anonymous" />
     <Script 
     async src="https://cdn.jsdelivr.net/npm/lazyhtml@1.2.3/dist/lazyhtml.min.js" crossOrigin="anonymous"
     />


<Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S0PC2HSKK5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S0PC2HSKK5');
          `}
        </Script>
        <Footer></Footer>
        </body>
    </html>

  );
}
