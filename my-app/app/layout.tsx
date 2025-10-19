import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getCurrentSubdomain } from "../utils/domain";

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
      </body>
    </html>
  );
}

// Generate metadata based on subdomain
export async function generateMetadata(): Promise<Metadata> {
  const subdomain = await getCurrentSubdomain();

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
    metadataBase: new URL(subdomain === 'app' ? 'https://app.prawnbox.com' : 'https://prawnbox.com'),
    alternates: {
      canonical: subdomain === 'app' ? 'https://app.prawnbox.com' : 'https://prawnbox.com',
    },
    openGraph: {
      type: 'website',
      locale: 'en_NG',
      url: subdomain === 'app' ? 'https://app.prawnbox.com' : 'https://prawnbox.com',
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
