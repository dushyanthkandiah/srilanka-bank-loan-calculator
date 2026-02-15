"use client";

import React from "react";
import styles from "./BreakdownTable.module.css";

interface PaymentSchedule {
    month: number;
    principalPayment: number;
    interestPayment: number;
    monthlyInstallment: number;
    balance: number;
}

interface BreakdownTableProps {
    schedule: PaymentSchedule[];
}

const BreakdownTable: React.FC<BreakdownTableProps> = ({ schedule }) => {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-LK", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    return (
        <div className={`mt-4 mt-lg-0 ${styles.card}`}>
            <h2 className="text-center mb-0" style={{ color: "var(--foreground)", fontSize: "1.75rem", fontWeight: 700 }}>
                Loan Breakdown
            </h2>
            <div className={styles.tableContainer}>
                <table className={styles.customTable}>
                    <thead>
                        <tr>
                            <th scope="col">Months</th>
                            <th scope="col">Principal</th>
                            <th scope="col">Interest</th>
                            <th scope="col">Installment</th>
                            <th scope="col">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((row) => (
                            <tr key={row.month}>
                                <td>{row.month}</td>
                                <td>{formatCurrency(row.principalPayment)}</td>
                                <td>{formatCurrency(row.interestPayment)}</td>
                                <td>{formatCurrency(row.monthlyInstallment)}</td>
                                <td>{formatCurrency(row.balance)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BreakdownTable;
