"use client";

import React, { useState, useEffect } from "react";
import BreakdownTableView from "./BreakdownTable.view";

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

/**
 * BreakdownTable Component (Controller)
 * Handles logic for displaying the loan repayment schedule.
 */
export default function BreakdownTable({ schedule }: BreakdownTableProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-LK", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    return <BreakdownTableView mounted={mounted} schedule={schedule} formatCurrency={formatCurrency} />;
}
