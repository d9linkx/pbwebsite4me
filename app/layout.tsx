import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { WebsiteHeader } from "@/components/shared/header";
import { WebsiteFooter } from "@/components/shared/footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${plusJakartaSans.variable} antialiased`}>
        <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
          <WebsiteHeader />
          <main className="flex-1 w-full">{children}</main>
          <WebsiteFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}

// Generate metadata based on subdomain
export async function generateMetadata(): Promise<Metadata> {
  // Get domain from environment variables with fallbacks
  const websiteDomain =
    process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || "localhost:3000";

  const baseUrl = `https://${websiteDomain}`;

  return {
    title: "Prawnbox - Peer-to-Peer Delivery",
    description:
      "Fast, secure, and reliable peer-to-peer delivery service in Nigeria",
    keywords: [
      "peer delivery",
      "package delivery",
      "logistics Nigeria",
      "courier service",
    ],
    authors: [{ name: "Prawnbox" }],
    creator: "Prawnbox",
    publisher: "Prawnbox",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_NG",
      url: baseUrl,
      title: "Prawnbox - Peer-to-Peer Delivery",
      description:
        "Fast, secure, and reliable peer-to-peer delivery service in Nigeria",
      siteName: "Prawnbox",
    },
    twitter: {
      card: "summary_large_image",
      title: "Prawnbox - Peer-to-Peer Delivery",
      description:
        "Fast, secure, and reliable peer-to-peer delivery service in Nigeria",
    },
  };
}
