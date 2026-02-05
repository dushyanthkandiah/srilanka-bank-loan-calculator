import type { Metadata, Viewport } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SL Loan Calc",
  },
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
    "bank loan calculator sri lanka"
  ],
  openGraph: {
    title: "Loan Calculator Sri Lanka | Personal & Home Loan Tools",
    description: "Calculate your monthly installments for Personal Loans, Home Loans, and Vehicle Leasing in Sri Lanka. Support for Equated and Reducing Balance repayment types.",
    type: "website",
    locale: "en_LK",
    siteName: "SL Loan Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka Loan & Leasing Calculator",
    description: "Plan your finances with our advanced Loan Calculator. Supports all major Sri Lankan bank interest methods.",
  },
  alternates: {
    canonical: "/",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Personal Loan Calculator",
              "operatingSystem": "All",
              "applicationCategory": "FinanceApplication",
              "description": "Calculate personal loan installments with Equated Monthly Installment (EMI) or Reducing Balance methods.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }),
          }}
        />
      </head>
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body>
        {children}
      </body>
    </html>
  );
}
