import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Loan Calculator | Best Loan Interest Calculator Sri Lanka",
  description: "Calculate your monthly loan installments (EMI or Reducing Balance) and see a detailed monthly breakdown with ease. The best personal loan calculator for Sri Lankan banks.",
  keywords: ["loan calculator", "EMI calculator", "reducing balance calculator", "personal loan Sri Lanka", "bank loan calculator", "installment calculator"],
  openGraph: {
    title: "Personal Loan Calculator | Plan Your Finances with Ease",
    description: "Calculate monthly installments and view detailed payment schedules for personal loans.",
    type: "website",
    locale: "en_LK",
    siteName: "Loan Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Loan Calculator",
    description: "Calculate monthly installments and view detailed payment schedules for personal loans.",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
