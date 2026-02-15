"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./Calculator.module.css";

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
    periodUnit,
    setPeriodUnit,
}) => {
    const [mounted, setMounted] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setMounted(true);
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current as any);
                clearInterval(timerRef.current as any);
            }
        };
    }, []);

    // Constants
    const MIN_AMOUNT = 100000;
    const MAX_AMOUNT = 10000000;
    const MIN_RATE = 1;
    const MAX_RATE = 30;
    const MIN_YEARS = 1;
    const MAX_YEARS = 15;

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
        const val = Number(e.target.value);
        setLoanAmount(val);
    };

    const handleIncrementAmount = () => {
        setLoanAmount(prev => (prev ?? 0) + 100000);
    };

    const handleDecrementAmount = () => {
        setLoanAmount(prev => {
            const next = (prev ?? 0) - 100000;
            return next >= MIN_AMOUNT ? next : MIN_AMOUNT;
        });
    };

    const handleIncrementYears = () => {
        setYears(prev => {
            const current = prev ?? 0;
            if (periodUnit === 'Year') {
                return current + 1;
            } else {
                // Increment by 1 month (1/12 year)
                return current + (1/12);
            }
        });
    };

    const handleDecrementYears = () => {
        setYears(prev => {
            const current = prev ?? 0;
            if (periodUnit === 'Year') {
                const next = current - 1;
                return next >= MIN_YEARS ? next : MIN_YEARS;
            } else {
                const next = current - (1/12);
                // Ensure at least 1 month
                return next >= (1/12) ? next : (1/12);
            }
        });
    };

    const handleIncrementRate = () => {
        setInterestRate(prev => (prev ?? 0) + 0.5);
    };

    const handleDecrementRate = () => {
        setInterestRate(prev => {
            const next = (prev ?? 0) - 0.5;
            return next >= MIN_RATE ? next : MIN_RATE;
        });
    };

    const startAdjusting = (type: 'incAmount' | 'decAmount' | 'incYears' | 'decYears' | 'incRate' | 'decRate') => {
        // Auto-hide keyboard on mobile
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

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
        
        if (timerRef.current) clearTimeout(timerRef.current as any);

        timerRef.current = setTimeout(() => {
            timerRef.current = setInterval(action!, 80) as any;
        }, 500);
    };

    const stopAdjusting = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current as any);
            clearInterval(timerRef.current as any);
            timerRef.current = null;
        }
    };

    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setInterestRate(null);
            return;
        }
        const val = Number(e.target.value);
        setInterestRate(val);
    };

    const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setYears(null);
            return;
        }
        const val = Number(e.target.value);
        if (periodUnit === 'Year') {
            setYears(val);
        } else {
            setYears(val / 12);
        }
    };

    const togglePeriodUnit = (unit: 'Year' | 'Month') => {
        if (unit === periodUnit) return;
        setPeriodUnit(unit);
        if (unit === 'Year') {
            setYears(prev => prev ? Math.round(prev) : null);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h1 className={styles.title}>Sri Lanka Loan Calculator</h1>
                <p className={styles.subtitle}>Personal Loans • Home Loans • Vehicle Leasing</p>
            </div>

            {/* Loan Amount */}
            <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                    <label className={styles.label}>Loan Amount (LKR)</label>
                    <span className={styles.valueDisplay}>{mounted ? formatCurrency(loanAmount) : "..."}</span>
                </div>
                <div className={styles.inputRowWithButtons}>
                    <div className={styles.inputWrapper}>
                        <span className={styles.currencySymbol}>Rs</span>
                        <input
                            type="number"
                            value={loanAmount ?? ""}
                            onChange={handleAmountChange}
                            className={`${styles.numberInput} ${styles.numberInputWithSymbol}`}
                        />
                    </div>
                    <div className={styles.adjustButtons}>
                        <button
                            onPointerDown={(e) => { e.preventDefault(); startAdjusting('decAmount'); }}
                            onPointerUp={stopAdjusting}
                            onPointerLeave={stopAdjusting}
                            className={styles.adjustBtn}
                            type="button"
                            title="Decrease by 100,000"
                        >
                            -
                        </button>
                        <button
                            onPointerDown={(e) => { e.preventDefault(); startAdjusting('incAmount'); }}
                            onPointerUp={stopAdjusting}
                            onPointerLeave={stopAdjusting}
                            className={styles.adjustBtn}
                            type="button"
                            title="Increase by 100,000"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* Repayment Period */}
            <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                    <label className={styles.label}>Repayment Period ({periodUnit === 'Year' ? 'Years' : 'Months'})</label>
                    <span className={styles.valueDisplay}>
                        {periodUnit === 'Year' ? (years ?? 0) : Math.round((years ?? 0) * 12)} {periodUnit}s
                    </span>
                </div>
                <div className={styles.inputRowWithButtons}>
                    <div className={styles.inputWrapper}>
                        <input
                            type="number"
                            value={periodUnit === 'Year' ? (years ?? "") : (years ? Math.round(years * 12) : "")}
                            onChange={handleYearsChange}
                            className={styles.numberInput}
                            min={MIN_YEARS}
                        />
                    </div>
                    <div className={styles.adjustButtons}>
                        <button
                            onPointerDown={(e) => { e.preventDefault(); startAdjusting('decYears'); }}
                            onPointerUp={stopAdjusting}
                            onPointerLeave={stopAdjusting}
                            className={styles.adjustBtn}
                            type="button"
                            title={`Decrease by 1 ${periodUnit}`}
                        >
                            -
                        </button>
                        <button
                            onPointerDown={(e) => { e.preventDefault(); startAdjusting('incYears'); }}
                            onPointerUp={stopAdjusting}
                            onPointerLeave={stopAdjusting}
                            className={styles.adjustBtn}
                            type="button"
                            title={`Increase by 1 ${periodUnit}`}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.periodToggleGroup}>
                    <button
                        type="button"
                        className={`${styles.periodToggleBtn} ${periodUnit === 'Year' ? styles.periodToggleBtnActive : ''}`}
                        onClick={() => togglePeriodUnit('Year')}
                    >
                        Year
                    </button>
                    <button
                        type="button"
                        className={`${styles.periodToggleBtn} ${periodUnit === 'Month' ? styles.periodToggleBtnActive : ''}`}
                        onClick={() => togglePeriodUnit('Month')}
                    >
                        Month
                    </button>
                </div>
            </div>

            {/* Interest Rate */}
            <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                    <label className={styles.label}>Interest Rate (% p.a.)</label>
                    <span className={styles.valueDisplay}>{interestRate}%</span>
                </div>
                <div className={styles.inputRowWithButtons}>
                    <div className={styles.inputWrapper}>
                        <input
                            type="number"
                            value={interestRate ?? ""}
                            onChange={handleRateChange}
                            className={styles.numberInput}
                            min={MIN_RATE}
                            max={MAX_RATE}
                            step={0.5}
                        />
                    </div>
                    <div className={styles.adjustButtons}>
                        <button
                            onPointerDown={(e) => { e.preventDefault(); startAdjusting('decRate'); }}
                            onPointerUp={stopAdjusting}
                            onPointerLeave={stopAdjusting}
                            className={styles.adjustBtn}
                            type="button"
                            title="Decrease by 0.5%"
                        >
                            -
                        </button>
                        <button
                            onPointerDown={(e) => { e.preventDefault(); startAdjusting('incRate'); }}
                            onPointerUp={stopAdjusting}
                            onPointerLeave={stopAdjusting}
                            className={styles.adjustBtn}
                            type="button"
                            title="Increase by 0.5%"
                        >
                            +
                        </button>
                    </div>
                </div>
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
                <div className={styles.resultValue}>{mounted ? formatCurrency(emi) : "..."}</div>
            </div>

            <div className={styles.breakdown}>
                <div className={styles.breakdownItem}>
                    <span className={styles.breakdownLabel}>Total Payment</span>
                    <span className={styles.breakdownValue}>{mounted ? formatCurrency(totalPayment) : "..."}</span>
                </div>
                <div className={styles.breakdownItem} style={{ textAlign: "right" }}>
                    <span className={styles.breakdownLabel}>Total Interest</span>
                    <span className={styles.breakdownValue}>{mounted ? formatCurrency(totalInterest) : "..."}</span>
                </div>
            </div>


        </div>
    );
};

export default Calculator;
