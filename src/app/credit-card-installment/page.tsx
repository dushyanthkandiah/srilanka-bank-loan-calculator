import React, { Suspense } from "react";
import type { Metadata } from "next";
import CreditCardCalculator from "@/components/CreditCardCalculator";
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
                    <div className="col-12 d-flex justify-content-center">
                        <Suspense fallback={<div>Loading...</div>}>
                            <CreditCardCalculator />
                        </Suspense>
                    </div>
                </div>
            </div>
        </main>
    );
}
