import Script from 'next/script';

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sri Lanka Loan Calculator',
    description: 'Advanced loan calculator for Sri Lanka. Calculate Personal Loans, Home Loans, and Vehicle Leasing installments with Equated or Reducing Balance repayment types.',
    operatingSystem: 'Web',
    applicationCategory: 'FinanceApplication',
    url: 'https://srilanka-loan-calculator.vercel.app',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'LKR',
      availability: 'https://schema.org/InStock',
    },
    author: {
      '@type': 'Organization',
      name: 'Sri Lanka Loan Calculator Team',
    },
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
