"use client";

import React, { Suspense } from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator";

export default function GenerateQRPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <QRCodeGenerator />
        </Suspense>
    );
}

