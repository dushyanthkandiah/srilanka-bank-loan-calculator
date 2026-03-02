import React, { Suspense } from "react";
import type { Metadata } from "next";
import CreditCardCalculator from "@/components/CreditCardCalculator";
import { AdUnit } from "@/components/AdSense";
import styles from "../page.module.css";

export const metadata: Metadata = {
    title: "Credit Card Installment Calculator Sri Lanka",
    description: "Calculate monthly installments for credit card purchases in Sri Lanka. Support for fixed monthly interest rates and processing fees.",
};

export default function CreditCardInstallmentPage() {
    return (
        <main className={styles.main}>
            <div className="container-fluid py-4 px-md-5">
                <div className="row justify-content-center">
                    <div className="col-12 d-flex flex-column align-items-center">
                        <Suspense fallback={<div>Loading...</div>}>
                            <CreditCardCalculator />
                        </Suspense>
                        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
                            <div className="mt-4 w-100 max-w-lg mx-auto">
                                <AdUnit 
                                    pId={process.env.NEXT_PUBLIC_ADSENSE_ID} 
                                    slotId="XXXXXXXXXX" 
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
