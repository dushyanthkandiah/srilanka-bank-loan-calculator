import React, { Suspense } from "react";
import type { Metadata } from "next";
import QRCodeGenerator from "@/components/QRCodeGenerator";

export const metadata: Metadata = {
    title: "QR Code Generator | Sri Lanka Loan Calculator",
    description: "Free QR code generator tool.",
};

export default function GenerateQRPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <QRCodeGenerator />
        </Suspense>
    );
}

