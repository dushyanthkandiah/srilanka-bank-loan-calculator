"use client";

import React, { useRef, useEffect, useState } from "react";
import CreditCardCalculatorView from "./CreditCardCalculator.view";
import { BANKS, Bank } from "./bankData";

/**
 * CreditCardCalculator Component (Controller)
 * Handles all logic, state updates, and calculations for the credit card installment calculator.
 */
export default function CreditCardCalculator() {
    const [purchaseAmount, setPurchaseAmount] = useState<number | null>(50000);
    const [interestRate, setInterestRate] = useState<number | null>(1.5);
    const [months, setMonths] = useState<number | null>(12);
    const [processingFeeRate, setProcessingFeeRate] = useState<number | null>(0);

    // Bank Selection State
    const [selectedBankId, setSelectedBankId] = useState<string>("");
    const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(-1);

    const [monthlyInstallment, setMonthlyInstallment] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [totalFee, setTotalFee] = useState<number>(0);

    const [mounted, setMounted] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setMounted(true);
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                clearInterval(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        calculateInstallments();
    }, [purchaseAmount, interestRate, months, processingFeeRate]);

    const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const bankId = e.target.value;
        setSelectedBankId(bankId);
        
        // Auto-select first plan if bank is selected
        if (bankId) {
            const bank = BANKS.find(b => b.id === bankId);
            if (bank && bank.plans.length > 0) {
                const firstPlan = bank.plans[0];
                setSelectedPlanIndex(0);
                setMonths(firstPlan.months);
                setInterestRate(firstPlan.interestRate);
            } else {
                setSelectedPlanIndex(-1);
            }
        } else {
            setSelectedPlanIndex(-1);
        }
    };

    const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index = parseInt(e.target.value);
        setSelectedPlanIndex(index);

        if (index >= 0 && selectedBankId) {
            const bank = BANKS.find(b => b.id === selectedBankId);
            if (bank && bank.plans[index]) {
                const plan = bank.plans[index];
                setMonths(plan.months);
                setInterestRate(plan.interestRate);
            }
        }
    };

    const calculateInstallments = () => {
        const p = purchaseAmount ?? 0;
        const r = interestRate ?? 0; // One-time fixed rate
        const n = months ?? 1;
        const fr = processingFeeRate ?? 0;

        // One-time Fixed Rate Formula:
        // Total Interest = Principal * (Rate / 100)
        // Processing Fee = Principal * (Fee Rate / 100)
        // Total Payment = Principal + Total Interest + Processing Fee
        // Monthly Installment = Total Payment / Months
        
        const totalInt = p * (r / 100);
        const fee = p * (fr / 100);
        const totalPay = p + totalInt + fee;
        const monthlyInst = n > 0 ? totalPay / n : 0;

        setTotalInterest(totalInt);
        setTotalFee(fee);
        setTotalPayment(totalPay);
        setMonthlyInstallment(monthlyInst);
    };

    const formatCurrency = (value: number | null) => {
        if (value === null) return "0.00";
        return new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: "LKR",
            minimumFractionDigits: 2,
        }).format(value);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setPurchaseAmount(null);
            return;
        }
        setPurchaseAmount(Number(e.target.value));
    };

    const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setMonths(null);
            return;
        }
        setMonths(Number(e.target.value));
    };

    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setInterestRate(null);
            return;
        }
        setInterestRate(Number(e.target.value));
    };

    const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setProcessingFeeRate(null);
            return;
        }
        setProcessingFeeRate(Number(e.target.value));
    };

    const handleIncrementAmount = () => setPurchaseAmount(prev => (prev ?? 0) + 10000);
    const handleDecrementAmount = () => setPurchaseAmount(prev => {
        const next = (prev ?? 0) - 10000;
        return next >= 0 ? next : 0;
    });

    const handleIncrementMonths = () => setMonths(prev => {
        const next = (prev ?? 0) + 3;
        return next <= 60 ? next : 60;
    });
    const handleDecrementMonths = () => setMonths(prev => {
        const next = (prev ?? 0) - 3;
        return next >= 3 ? next : 3;
    });

    const handleIncrementRate = () => setInterestRate(prev => (prev ?? 0) + 0.5);
    const handleDecrementRate = () => setInterestRate(prev => {
        const next = (prev ?? 0) - 0.5;
        return next >= 0 ? next : 0;
    });

    const handleIncrementFee = () => setProcessingFeeRate(prev => (prev ?? 0) + 0.5);
    const handleDecrementFee = () => setProcessingFeeRate(prev => {
        const next = (prev ?? 0) - 0.5;
        return next >= 0 ? next : 0;
    });

    const startAdjusting = (type: string) => {
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();

        let action: () => void;
        switch (type) {
            case 'incAmount': action = handleIncrementAmount; break;
            case 'decAmount': action = handleDecrementAmount; break;
            case 'incMonths': action = handleIncrementMonths; break;
            case 'decMonths': action = handleDecrementMonths; break;
            case 'incRate': action = handleIncrementRate; break;
            case 'decRate': action = handleDecrementRate; break;
            case 'incFee': action = handleIncrementFee; break;
            case 'decFee': action = handleDecrementFee; break;
            default: return;
        }

        action();
        timerRef.current = setTimeout(() => {
            timerRef.current = setInterval(action, 100);
        }, 500);
    };

    const stopAdjusting = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    return (
        <CreditCardCalculatorView
            purchaseAmount={purchaseAmount}
            interestRate={interestRate}
            months={months}
            processingFeeRate={processingFeeRate}
            totalFee={totalFee}
            monthlyInstallment={monthlyInstallment}
            totalPayment={totalPayment}
            totalInterest={totalInterest}
            mounted={mounted}
            formatCurrency={formatCurrency}
            handleAmountChange={handleAmountChange}
            handleMonthsChange={handleMonthsChange}
            handleRateChange={handleRateChange}
            handleFeeChange={handleFeeChange}
            startAdjusting={startAdjusting}
            stopAdjusting={stopAdjusting}
            // New Props
            banks={BANKS}
            selectedBankId={selectedBankId}
            selectedPlanIndex={selectedPlanIndex}
            handleBankChange={handleBankChange}
            handlePlanChange={handlePlanChange}
        />
    );
}
