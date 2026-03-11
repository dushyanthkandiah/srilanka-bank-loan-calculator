import React from "react";
import styles from "./CreditCardCalculator.module.css";
import { Bank } from "./bankData";

interface CreditCardCalculatorViewProps {
    purchaseAmount: number | null;
    interestRate: number | null;
    months: number | null;
    processingFeeRate: number | null;
    totalFee: number;
    monthlyInstallment: number;
    totalPayment: number;
    totalInterest: number;
    mounted: boolean;
    formatCurrency: (value: number | null) => string;
    handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleMonthsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFeeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    startAdjusting: (type: string) => void;
    stopAdjusting: () => void;

    // Bank Props
    banks: Bank[];
    selectedBankId: string;
    selectedPlanIndex: number;
    handleBankChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handlePlanChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Tooltip = ({ text }: { text: string }) => (
    <span className={styles.tooltipContainer}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.tooltipIcon}
        >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span className={styles.tooltipText}>{text}</span>
    </span>
);

/**
 * CreditCardCalculator View (Template)
 * Purely presentational component for the credit card installment calculator interface.
 */
export default function CreditCardCalculatorView(props: CreditCardCalculatorViewProps) {
    const {
        purchaseAmount, interestRate, months, processingFeeRate, totalFee,
        monthlyInstallment, totalPayment, totalInterest,
        mounted, formatCurrency, handleAmountChange, handleMonthsChange,
        handleRateChange, handleFeeChange, startAdjusting, stopAdjusting,
        banks, selectedBankId, selectedPlanIndex, handleBankChange, handlePlanChange
    } = props;

    const selectedBank = banks.find(b => b.id === selectedBankId);

    return (
        <div className={styles.calculatorWrapper}>
            {/* Top Bank Selection Card */}
            <div className={styles.bankCard}>
                <div className={styles.header}>
                    <h2 className={styles.title} style={{ fontSize: '1.5rem' }}>Select Your Bank</h2>
                    <p className={styles.subtitle}>Choose a bank to see available installment plans</p>
                </div>

                <div className={styles.dropdownRow}>
                    <div className={styles.dropdownCol}>
                        <label className={styles.label}>Bank <Tooltip text="Select your bank to see specific installment plans" /></label>
                        <select
                            className={styles.selectInput}
                            value={selectedBankId}
                            onChange={handleBankChange}
                        >
                            <option value="">-- Custom / Other --</option>
                            {banks.map(bank => (
                                <option key={bank.id} value={bank.id}>{bank.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.dropdownCol}>
                        <label className={styles.label}>Plan <Tooltip text="Choose the installment period and interest rate offered by the bank" /></label>
                        <select
                            className={styles.selectInput}
                            value={selectedPlanIndex}
                            onChange={handlePlanChange}
                            disabled={!selectedBank}
                            style={{ opacity: !selectedBank ? 0.5 : 1, cursor: !selectedBank ? 'not-allowed' : 'pointer' }}
                        >
                            {!selectedBank && <option value={-1}>-- Select Bank First --</option>}
                            {selectedBank?.plans.map((plan, idx) => (
                                <option key={idx} value={idx}>
                                    {plan.months} Months @ {plan.interestRate}% Interest
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Split Layout for Calculator Input and Results */}
            <div className={styles.splitLayout}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Credit Card Installment</h1>
                        <p className={styles.subtitle}>Convert your purchases into easy monthly plans</p>
                    </div>

                    {/* Purchase Amount */}
                    <div className={styles.inputGroup}>
                        <div className={styles.labelRow}>
                            <label className={styles.label}>Purchase Amount (LKR) <Tooltip text="The total amount of the transaction you want to convert to installments" /></label>
                            <span className={styles.valueDisplay}>{mounted ? formatCurrency(purchaseAmount) : "..."}</span>
                        </div>
                        <div className={styles.inputRowWithButtons}>
                            <div className={styles.inputWrapper}>
                                <span className={styles.currencySymbol}>Rs</span>
                                <input
                                    type="number"
                                    value={purchaseAmount ?? ""}
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

                    {/* Installment Period */}
                    <div className={styles.inputGroup}>
                        <div className={styles.labelRow}>
                            <label className={styles.label}>Period (Months) <Tooltip text="The duration over which you will repay the amount" /></label>
                            <span className={styles.valueDisplay}>{months ?? 0} Months</span>
                        </div>
                        <div className={styles.inputRowWithButtons}>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="number"
                                    value={months ?? ""}
                                    onChange={handleMonthsChange}
                                    className={styles.numberInput}
                                />
                            </div>
                            <div className={styles.adjustButtons}>
                                <button
                                    onPointerDown={(e) => { e.preventDefault(); startAdjusting('decMonths'); }}
                                    onPointerUp={stopAdjusting}
                                    onPointerLeave={stopAdjusting}
                                    className={styles.adjustBtn}
                                    type="button"
                                >
                                    -
                                </button>
                                <button
                                    onPointerDown={(e) => { e.preventDefault(); startAdjusting('incMonths'); }}
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

                    {/* One-time Interest Rate */}
                    <div className={styles.inputGroup}>
                        <div className={styles.labelRow}>
                            <label className={styles.label}>One-time Interest (%) <Tooltip text="The fixed interest rate applied to the principal amount" /></label>
                            <span className={styles.valueDisplay}>{interestRate ?? 0}%</span>
                        </div>
                        <div className={styles.inputRowWithButtons}>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="number"
                                    value={interestRate ?? ""}
                                    onChange={handleRateChange}
                                    step="0.5"
                                    className={styles.numberInput}
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

                    {/* Processing Fee */}
                    <div className={styles.inputGroup}>
                        <div className={styles.labelRow}>
                            <label className={styles.label}>Processing Fee (%) <Tooltip text="A one-time fee charged by the bank for processing the installment plan" /></label>
                            <span className={styles.valueDisplay}>{processingFeeRate ?? 0}%</span>
                        </div>
                        <div className={styles.inputRowWithButtons}>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="number"
                                    value={processingFeeRate ?? ""}
                                    onChange={handleFeeChange}
                                    step="0.5"
                                    className={styles.numberInput}
                                />
                            </div>
                            <div className={styles.adjustButtons}>
                                <button
                                    onPointerDown={(e) => { e.preventDefault(); startAdjusting('decFee'); }}
                                    onPointerUp={stopAdjusting}
                                    onPointerLeave={stopAdjusting}
                                    className={styles.adjustBtn}
                                    type="button"
                                >
                                    -
                                </button>
                                <button
                                    onPointerDown={(e) => { e.preventDefault(); startAdjusting('incFee'); }}
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
                </div>

                {/* Results Panel */}
                <div className={styles.resultCard}>
                    <div className={styles.header}>
                        <h2 className={styles.title} style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Payment Summary</h2>
                        <p className={styles.subtitle}>Your installment breakdown</p>
                    </div>

                    <div className={styles.resultSection}>
                        <div className={styles.resultLabel}>Monthly Installment <Tooltip text="The amount you need to pay each month" /></div>
                        <div className={styles.resultValue}>{mounted ? formatCurrency(monthlyInstallment) : "..."}</div>
                    </div>

                    <div className={styles.breakdown}>
                        <div className={styles.breakdownItem}>
                            <span className={styles.breakdownLabel}>Interest Fee <Tooltip text="Total interest charged for the installment plan" /></span>
                            <span className={styles.breakdownValue}>{mounted ? formatCurrency(totalInterest) : "..."}</span>
                        </div>
                        <div className={styles.breakdownItem} style={{ textAlign: "right" }}>
                            <span className={styles.breakdownLabel}>Processing Fee <Tooltip text="Total processing fee charged" /></span>
                            <span className={styles.breakdownValue}>{mounted ? formatCurrency(totalFee) : "..."}</span>
                        </div>
                    </div>

                    <div className={styles.breakdown} style={{ paddingTop: "1rem", borderTop: "none" }}>
                        <div className={styles.breakdownItem}>
                            <span className={styles.breakdownLabel}>Principal <Tooltip text="The original purchase amount" /></span>
                            <span className={styles.breakdownValue}>{mounted ? formatCurrency(purchaseAmount) : "..."}</span>
                        </div>
                        <div className={styles.breakdownItem} style={{ textAlign: "right" }}>
                            <span className={styles.breakdownLabel}>Total Payment <Tooltip text="Total amount you will pay including interest and fees" /></span>
                            <span className={styles.breakdownValue}>{mounted ? formatCurrency(totalPayment) : "..."}</span>
                        </div>
                    </div>

                    <div style={{ marginTop: '2.5rem', padding: '1.25rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--primary-color)' }}>
                        <div style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', lineHeight: '1.6' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '3px', color: 'var(--primary-color)' }}>
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <span style={{ fontStyle: 'italic', textAlign: 'justify' }}>
                                <strong style={{ fontStyle: 'normal' }}>Disclaimer:</strong> This calculator provides an estimate. Interest rates, fees, and installment plans may change over time or based on your specific card type. Please always verify the exact rates and terms directly with your bank by calling them or checking their official website before making any financial decisions.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
