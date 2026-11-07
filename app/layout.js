import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { getCategories, getProducts } from "@/lib/api";

export const metadata = {
  title: "বাজার দর — আজকের বাজারের দাম এক নজরে",
  description: "প্রয়োজনীয় পণ্যের দৈনিক বাজার দর, দাম বাড়া-কমার তথ্য ও বাজারভিত্তিক তুলনা।",
  icons: { icon: "/assets/logo-icon.png" },
};

export default async function RootLayout({ children }) {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return (
    <html lang="bn" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen antialiased">
        <Navbar categories={categories} />
        <Ticker products={products} />
        <main>{children}</main>
        <Footer />
        <Toast />
      </body>
    </html>
  );
}
