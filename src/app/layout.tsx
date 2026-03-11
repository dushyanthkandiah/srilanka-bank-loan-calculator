import type { Metadata, Viewport } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import MobileNavigationHandler from "@/components/MobileNavigationHandler";
import StructuredData from "@/components/StructuredData/StructuredData";
import { GoogleAdSense } from "@/components/AdSense";

/*
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://srilanka-bank-loan-calculator.vercel.app"),
  title: "Sri Lanka Loan Calculator | Personal, Home & Vehicle Loan Tools",
  description: "Free loan calculator for Sri Lanka. Calculate EMI for personal loans, home loans, vehicle leasing. Supports equated and reducing balance. Credit card installment plans for all major Sri Lankan banks.",
  applicationName: "Sri Lanka Loan Calculator",
  authors: [{ name: "Sri Lanka Loan Calculator Team" }],
  generator: "Next.js",
  keywords: "sri lanka loan calculator, EMI calculator sri lanka, home loan calculator, vehicle leasing calculator, credit card installment sri lanka, commercial bank installment plan",
  referrer: "origin-when-cross-origin",
  creator: "Sri Lanka Loan Calculator Team",
  publisher: "Sri Lanka Loan Calculator Team",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SL Loan Calc",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Sri Lanka Loan Calculator | Personal, Home & Vehicle Loan Tools",
    description: "Free loan calculator for Sri Lanka. Calculate EMI for personal loans, home loans, vehicle leasing. Supports equated and reducing balance. Credit card installment plans for all major Sri Lankan banks.",
    url: "https://srilanka-bank-loan-calculator.vercel.app",
    siteName: "Sri Lanka Loan Calculator",
    images: [
      {
        url: "/icon.png",
        width: 192,
        height: 192,
        alt: "Sri Lanka Loan Calculator",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka Loan Calculator | Personal, Home & Vehicle Loan Tools",
    description: "Free loan calculator for Sri Lanka. Calculate EMI for personal loans, home loans, vehicle leasing. Supports equated and reducing balance. Credit card installment plans for all major Sri Lankan banks.",
    images: ["/icon.png"],
  },
  alternates: {
    canonical: "/",
  },
  other: {
    "google-adsense-account": "ca-pub-5913105330451891",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body suppressHydrationWarning>
        <GoogleAdSense />
        <StructuredData />
        <ThemeProvider>
          <MobileNavigationHandler />
          <Navbar />
          {children}
          <BottomNav />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
