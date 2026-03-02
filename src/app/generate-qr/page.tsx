"use client";

import React, { Suspense } from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { AdUnit } from "@/components/AdSense";

export default function GenerateQRPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="container py-4">
                <QRCodeGenerator />
                {process.env.NEXT_PUBLIC_ADSENSE_ID && (
                    <div className="mt-4 w-100 max-w-lg mx-auto">
                        <AdUnit 
                            pId={process.env.NEXT_PUBLIC_ADSENSE_ID} 
                            slotId="XXXXXXXXXX" 
                        />
                    </div>
                )}
            </div>
        </Suspense>
    );
}

