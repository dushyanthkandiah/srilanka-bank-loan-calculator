"use client";

import React, { useRef, useEffect, useState } from "react";
import CalculatorView from "./Calculator.view";

interface CalculatorProps {
    loanAmount: number | null;
    setLoanAmount: React.Dispatch<React.SetStateAction<number | null>>;
    interestRate: number | null;
    setInterestRate: React.Dispatch<React.SetStateAction<number | null>>;
    years: number | null;
    setYears: React.Dispatch<React.SetStateAction<number | null>>;
    emi: number;
    firstMonthInterest: number;
    firstMonthCapital: number;
    totalPayment: number;
    totalInterest: number;
    repaymentType: string;
    setRepaymentType: React.Dispatch<React.SetStateAction<string>>;
    periodUnit: 'Year' | 'Month';
    setPeriodUnit: React.Dispatch<React.SetStateAction<'Year' | 'Month'>>;
}

/**
 * Calculator Component (Controller)
 * Handles all logic, state updates, and calculations for the loan calculator.
 */
export default function Calculator(props: CalculatorProps) {
    const {
        loanAmount, setLoanAmount,
        interestRate, setInterestRate,
        years, setYears,
        emi, totalPayment, totalInterest,
        repaymentType, setRepaymentType,
        periodUnit, setPeriodUnit
    } = props;

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

    // Constants
    const MIN_AMOUNT = 100000;
    const MIN_RATE = 1;
    const MAX_RATE = 30;
    const MIN_YEARS = 1;

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
            setLoanAmount(null);
            return;
        }
        setLoanAmount(Number(e.target.value));
    };

    const handleIncrementAmount = () => setLoanAmount(prev => (prev ?? 0) + 100000);
    const handleDecrementAmount = () => setLoanAmount(prev => {
        const next = (prev ?? 0) - 100000;
        return next >= MIN_AMOUNT ? next : MIN_AMOUNT;
    });

    const handleIncrementYears = () => setYears(prev => (prev ?? 0) + (periodUnit === 'Year' ? 1 : 1/12));
    const handleDecrementYears = () => setYears(prev => {
        const current = prev ?? 0;
        const step = periodUnit === 'Year' ? 1 : 1/12;
        const next = current - step;
        return next >= step ? next : step;
    });

    const handleIncrementRate = () => setInterestRate(prev => (prev ?? 0) + 0.5);
    const handleDecrementRate = () => setInterestRate(prev => {
        const next = (prev ?? 0) - 0.5;
        return next >= MIN_RATE ? next : MIN_RATE;
    });

    const startAdjusting = (type: string) => {
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();

        let action;
        switch (type) {
            case 'incAmount': action = handleIncrementAmount; break;
            case 'decAmount': action = handleDecrementAmount; break;
            case 'incYears': action = handleIncrementYears; break;
            case 'decYears': action = handleDecrementYears; break;
            case 'incRate': action = handleIncrementRate; break;
            case 'decRate': action = handleDecrementRate; break;
        }
        
        if (!action) return;
        action();
        
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            timerRef.current = setInterval(action!, 80) as any;
        }, 500);
    };

    const stopAdjusting = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") { setInterestRate(null); return; }
        setInterestRate(Number(e.target.value));
    };

    const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") { setYears(null); return; }
        const val = Number(e.target.value);
        setYears(periodUnit === 'Year' ? val : val / 12);
    };

    const togglePeriodUnit = (unit: 'Year' | 'Month') => {
        if (unit === periodUnit) return;
        setPeriodUnit(unit);
        if (unit === 'Year') setYears(prev => prev ? Math.round(prev) : null);
    };

    return (
        <CalculatorView 
            {...props}
            mounted={mounted}
            formatCurrency={formatCurrency}
            handleAmountChange={handleAmountChange}
            handleYearsChange={handleYearsChange}
            handleRateChange={handleRateChange}
            startAdjusting={startAdjusting}
            stopAdjusting={stopAdjusting}
            togglePeriodUnit={togglePeriodUnit}
            MIN_YEARS={MIN_YEARS}
            MAX_RATE={MAX_RATE}
            MIN_RATE={MIN_RATE}
        />
    );
}
