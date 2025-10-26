import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getCurrentSubdomain } from "../utils/domain";
import { Toaster } from "sonner";

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
      <body
        className={`${plusJakartaSans.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

// Generate metadata based on subdomain
export async function generateMetadata(): Promise<Metadata> {
  const subdomain = await getCurrentSubdomain();

  // Get domain from environment variables with fallbacks
  const websiteDomain = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || 'localhost:3000'
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost:3000'

  const baseUrl = subdomain === 'app' ? `https://${appDomain}` : `https://${websiteDomain}`

  return {
    title: subdomain === 'app' ? "Prawnbox - Dashboard" : "Prawnbox - Peer-to-Peer Delivery",
    description: subdomain === 'app'
      ? "Manage your deliveries, track packages, and earn money with Prawnbox"
      : "Fast, secure, and reliable peer-to-peer delivery service in Nigeria",
    keywords: subdomain === 'app'
      ? ["delivery dashboard", "package tracking", "logistics management"]
      : ["peer delivery", "package delivery", "logistics Nigeria", "courier service"],
    authors: [{ name: "Prawnbox" }],
    creator: "Prawnbox",
    publisher: "Prawnbox",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_NG',
      url: baseUrl,
      title: subdomain === 'app' ? "Prawnbox - Dashboard" : "Prawnbox - Peer-to-Peer Delivery",
      description: subdomain === 'app'
        ? "Manage your deliveries, track packages, and earn money with Prawnbox"
        : "Fast, secure, and reliable peer-to-peer delivery service in Nigeria",
      siteName: 'Prawnbox',
    },
    twitter: {
      card: 'summary_large_image',
      title: subdomain === 'app' ? "Prawnbox - Dashboard" : "Prawnbox - Peer-to-Peer Delivery",
      description: subdomain === 'app'
        ? "Manage your deliveries, track packages, and earn money with Prawnbox"
        : "Fast, secure, and reliable peer-to-peer delivery service in Nigeria",
    },
  };
}
