import Script from "next/script";
import React from "react";

type Props = {
  pId?: string;
};

const GoogleAdSense = ({ pId }: Props) => {
  // Use prop, then env var, then hardcoded fallback for verification
  const adsenseId = pId || process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-5913105330451891";

  // Ensure it starts with ca-pub-
  const client = adsenseId.startsWith("ca-pub-") ? adsenseId : `ca-pub-${adsenseId}`;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default GoogleAdSense;
