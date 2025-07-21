import React from "react";
import AboutUsPage from "@/components/about/AboutUsPage";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "About Us | Paris Beauty",
  description:
    "Learn the story behind Paris Beauty. Discover our mission to bring you premium, honest, and natural beauty products. Join our community and celebrate your unique beauty.",
  keywords:
    "about us, paris beauty, cosmetic shop, beauty products, skincare, makeup, our story, beauty community",
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const Page: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-950">
      <AboutUsPage />
    </div>
  );
};

export default Page;
