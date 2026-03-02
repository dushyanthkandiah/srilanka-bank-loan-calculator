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
import GoogleAdSense from "@/components/AdSense/GoogleAdSense";

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
  title: "Best Loan Calculator Sri Lanka | Personal, Home Loan & Vehicle Leasing",
  description: "Advanced loan calculator for Sri Lanka. Calculate Personal Loans, Home Loans, and Vehicle Leasing installments with Equated or Reducing Balance repayment types. Hosted on Vercel.",
  applicationName: "Sri Lanka Loan Calculator",
  authors: [{ name: "Sri Lanka Loan Calculator Team" }],
  generator: "Next.js",
  keywords: [
    "loan calculator",
    "sri lanka",
    "personal loan",
    "home loan",
    "vehicle leasing",
    "repayment type",
    "reducing balance",
    "EMI calculator",
    "vercel",
    "bank loan calculator sri lanka",
    "finance",
    "interest rates",
    "monthly installment"
  ],
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
    title: "Loan Calculator Sri Lanka | Personal & Home Loan Tools",
    description: "Calculate your monthly installments for Personal Loans, Home Loans, and Vehicle Leasing in Sri Lanka. Support for Equated and Reducing Balance repayment types.",
    url: "https://srilanka-loan-calculator.vercel.app",
    siteName: "SL Loan Calculator",
    images: [
      {
        url: "/icon.png",
        width: 192,
        height: 192,
        alt: "Loan Calculator Sri Lanka",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka Loan & Leasing Calculator",
    description: "Plan your finances with our advanced Loan Calculator. Supports all major Sri Lankan bank interest methods.",
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
