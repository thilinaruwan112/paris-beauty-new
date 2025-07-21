import type { Metadata } from "next";
import { AppProviders } from "@/contexts/app-providers";
import { SiteHeader } from "@/components/header";
import { SiteFooter } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glamify - Premium Cosmetics",
  description: "Discover your beauty with Glamify's exclusive collection of cosmetic products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Belleza&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <AppProviders>
          <SiteHeader />
          <main className="flex-grow">{children}</main>
          <SiteFooter />
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
