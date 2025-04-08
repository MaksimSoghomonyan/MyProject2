import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Catalog",
  description: "Product catalog application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              Product Catalog
            </Link>
            <nav className="flex gap-4">
              <Button variant="ghost" asChild>
                <Link href="/products">Products</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/create-product">Create Product</Link>
              </Button>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
