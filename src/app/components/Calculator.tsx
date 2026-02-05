"use client";

import React from "react";
import styles from "./Calculator.module.css";

interface CalculatorProps {
    loanAmount: number;
    setLoanAmount: (val: number) => void;
    interestRate: number;
    setInterestRate: (val: number) => void;
    years: number;
    setYears: (val: number) => void;
    emi: number;
    firstMonthInterest: number;
    firstMonthCapital: number;
    totalPayment: number;
    totalInterest: number;
    repaymentType: string;
    setRepaymentType: (val: string) => void;
}

const Calculator: React.FC<CalculatorProps> = ({
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    years,
    setYears,
    emi,
    firstMonthInterest,
    firstMonthCapital,
    totalPayment,
    totalInterest,
    repaymentType,
    setRepaymentType,
}) => {
    // Constants
    const MIN_AMOUNT = 100000;
    const MAX_AMOUNT = 10000000;
    const MIN_RATE = 1;
    const MAX_RATE = 30;
    const MIN_YEARS = 1;
    const MAX_YEARS = 15;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: "LKR",
            minimumFractionDigits: 2,
        }).format(value);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        setLoanAmount(val);
    };

    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        setInterestRate(val);
    };

    const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        setYears(val);
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h1 className={styles.title}>Personal Loan Calculator</h1>
                <p className={styles.subtitle}>Plan your finances with ease</p>
            </div>

            {/* Loan Amount */}
            <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                    <label className={styles.label}>Loan Amount (LKR)</label>
                    <span className={styles.valueDisplay}>{formatCurrency(loanAmount)}</span>
                </div>
                <div className={styles.inputWrapper}>
                    <span className={styles.currencySymbol}>Rs</span>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={handleAmountChange}
                        className={`${styles.numberInput} ${styles.numberInputWithSymbol}`}
                        min={MIN_AMOUNT}
                    />
                </div>
                <input
                    type="range"
                    min={MIN_AMOUNT}
                    max={MAX_AMOUNT}
                    step={100000}
                    value={loanAmount}
                    onChange={handleAmountChange}
                    className={styles.slider}
                />
            </div>

            {/* Repayment Period */}
            <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                    <label className={styles.label}>Repayment Period (Years)</label>
                    <span className={styles.valueDisplay}>{years} Years</span>
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        type="number"
                        value={years}
                        onChange={handleYearsChange}
                        className={styles.numberInput}
                        min={MIN_YEARS}
                    />
                </div>
                <input
                    type="range"
                    min={MIN_YEARS}
                    max={MAX_YEARS}
                    step={1}
                    value={years}
                    onChange={handleYearsChange}
                    className={styles.slider}
                />
            </div>

            {/* Interest Rate */}
            <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                    <label className={styles.label}>Interest Rate (% p.a.)</label>
                    <span className={styles.valueDisplay}>{interestRate}%</span>
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        type="number"
                        value={interestRate}
                        onChange={handleRateChange}
                        className={styles.numberInput}
                        min={MIN_RATE}
                        max={MAX_RATE}
                        step={0.5}
                    />
                </div>
                <input
                    type="range"
                    min={MIN_RATE}
                    max={MAX_RATE}
                    step={0.5}
                    value={interestRate}
                    onChange={handleRateChange}
                    className={styles.slider}
                />
            </div>

            {/* Repayment Type Toggle */}
            <div className={styles.inputGroup}>
                <label className={styles.label}>Repayment Type</label>
                <div className={styles.toggleGroup}>
                    <button
                        type="button"
                        className={`${styles.toggleBtn} ${repaymentType === "equated" ? styles.toggleBtnActive : ""}`}
                        onClick={() => setRepaymentType("equated")}
                    >
                        Equated Balance
                    </button>
                    <button
                        type="button"
                        className={`${styles.toggleBtn} ${repaymentType === "reducing" ? styles.toggleBtnActive : ""}`}
                        onClick={() => setRepaymentType("reducing")}
                    >
                        Reducing Balance
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className={styles.resultSection}>
                <div className={styles.resultLabel}>
                    {repaymentType === "equated" ? "Monthly Installment" : "First Month Installment"}
                </div>
                <div className={styles.resultValue}>{formatCurrency(emi)}</div>
            </div>

            <div className={styles.breakdown}>
                <div className={styles.breakdownItem}>
                    <span className={styles.breakdownLabel}>Total Payment</span>
                    <span className={styles.breakdownValue}>{formatCurrency(totalPayment)}</span>
                </div>
                <div className={styles.breakdownItem} style={{ textAlign: "right" }}>
                    <span className={styles.breakdownLabel}>Total Interest</span>
                    <span className={styles.breakdownValue}>{formatCurrency(totalInterest)}</span>
                </div>
            </div>


        </div>
    );
};

export default Calculator;
