import React from "react";
import styles from "./Calculator.module.css";

interface CalculatorViewProps {
    loanAmount: number | null;
    interestRate: number | null;
    years: number | null;
    emi: number;
    totalPayment: number;
    totalInterest: number;
    repaymentType: string;
    setRepaymentType: (type: string) => void;
    periodUnit: 'Year' | 'Month';
    mounted: boolean;
    formatCurrency: (value: number | null) => string;
    handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleYearsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    startAdjusting: (type: string) => void;
    stopAdjusting: () => void;
    togglePeriodUnit: (unit: 'Year' | 'Month') => void;
    MIN_YEARS: number;
    MAX_RATE: number;
    MIN_RATE: number;
}

/**
 * Calculator View (Template)
 * Purely presentational component for the loan calculator interface.
 */
export default function CalculatorView(props: CalculatorViewProps) {
    const {
        loanAmount, interestRate, years, emi, totalPayment, totalInterest,
        repaymentType, setRepaymentType, periodUnit, mounted,
        formatCurrency, handleAmountChange, handleYearsChange, handleRateChange,
        startAdjusting, stopAdjusting, togglePeriodUnit,
        MIN_YEARS, MAX_RATE, MIN_RATE
    } = props;

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
                        >
                            -
                        </button>
                        <button
                            onPointerDown={(e) => { e.preventDefault(); startAdjusting('incAmount'); }}
                            onPointerUp={stopAdjusting}
                            onPointerLeave={stopAdjusting}
                            className={styles.adjustBtn}
                            type="button"
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
                        >
                            -
                        </button>
                        <button
                            onPointerDown={(e) => { e.preventDefault(); startAdjusting('incYears'); }}
                            onPointerUp={stopAdjusting}
                            onPointerLeave={stopAdjusting}
                            className={styles.adjustBtn}
                            type="button"
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
                        >
                            -
                        </button>
                        <button
                            onPointerDown={(e) => { e.preventDefault(); startAdjusting('incRate'); }}
                            onPointerUp={stopAdjusting}
                            onPointerLeave={stopAdjusting}
                            className={styles.adjustBtn}
                            type="button"
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
}
