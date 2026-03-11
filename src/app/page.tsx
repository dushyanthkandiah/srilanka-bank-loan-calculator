import React from "react";
import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Loan EMI Calculator Sri Lanka | Personal, Home & Vehicle Loans",
  description: "Calculate monthly installments for personal loans, home loans and vehicle leasing in Sri Lanka. Supports equated balance and reducing balance repayment methods.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to calculate loan EMI in Sri Lanka?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enter loan amount, repayment period in years, and interest rate. Choose equated balance or reducing balance method. The calculator shows monthly installment, total payment and full amortization schedule."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between equated balance and reducing balance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Equated balance charges interest on the full principal throughout the loan. Reducing balance charges interest only on the outstanding balance, making it cheaper over time."
      }
    },
    {
      "@type": "Question",
      "name": "Which Sri Lankan banks support credit card installment plans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Commercial Bank, Sampath Bank, HNB, Nations Trust Bank AMEX, HSBC, People's Bank, NDB, Seylan Bank and BOC offer installment plans."
      }
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient />
    </>
  );
}
