"use client";

import React, { useEffect } from "react";

interface AdUnitProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
}

const AdUnit: React.FC<AdUnitProps> = ({ adSlot, adFormat = "auto", fullWidthResponsive = true }) => {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-5913105330451891";

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = (window.adsbygoogle || [])).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="my-4 text-center overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
};

export default AdUnit;
