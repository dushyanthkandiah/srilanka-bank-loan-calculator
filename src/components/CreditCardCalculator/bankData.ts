export interface BankPlan {
    months: number;
    interestRate: number;
    label?: string; // e.g. "6 Months @ 5%"
}

export interface Bank {
    id: string;
    name: string;
    plans: BankPlan[];
}

export const BANKS: Bank[] = [
    {
        id: "commercial",
        name: "Commercial Bank",
        plans: [
            { months: 6, interestRate: 5.0 },
            { months: 12, interestRate: 8.5 },
            { months: 18, interestRate: 10.0 },
            { months: 24, interestRate: 12.5 },
            { months: 36, interestRate: 12.5 },
            { months: 48, interestRate: 12.5 },
            { months: 60, interestRate: 12.5 },
        ]
    },
    {
        id: "sampath",
        name: "Sampath Bank (Call & Convert)",
        plans: [
            { months: 3, interestRate: 2.5 },
            { months: 6, interestRate: 4.5 },
            { months: 12, interestRate: 9.5 },
            { months: 24, interestRate: 17.0 },
        ]
    },
    {
        id: "hnb",
        name: "Hatton National Bank (HNB)",
        plans: [
            { months: 3, interestRate: 3.0 },
            { months: 6, interestRate: 5.0 },
            { months: 12, interestRate: 10.0 },
            { months: 24, interestRate: 16.0 },
        ]
    },
    {
        id: "ntb",
        name: "Nations Trust Bank (AMEX)",
        plans: [
            { months: 6, interestRate: 0.0 },
            { months: 12, interestRate: 0.0 },
            { months: 24, interestRate: 22.0 },
        ]
    },
    {
        id: "hsbc",
        name: "HSBC Sri Lanka",
        plans: [
            { months: 3, interestRate: 3.0 },
            { months: 6, interestRate: 5.5 },
            { months: 12, interestRate: 11.0 },
        ]
    },
    {
        id: "peoples",
        name: "People's Bank",
        plans: [
            { months: 12, interestRate: 0.0 },
            { months: 24, interestRate: 0.0 },
        ]
    },
    // The following rates are estimated based on typical market handling fees for Call & Convert schemes as of 2024/2025.
    // Official rates are subject to change and should be verified with the bank.
    {
        id: "ndb",
        name: "NDB Bank (Call & Convert)",
        plans: [
            { months: 3, interestRate: 3.5, label: "Handling Fee: 3.5%" },
            { months: 6, interestRate: 6.0, label: "Handling Fee: 6.0%" },
            { months: 12, interestRate: 11.0, label: "Handling Fee: 11.0%" },
            { months: 24, interestRate: 20.0, label: "Handling Fee: 20.0%" },
        ]
    },
    {
        id: "seylan",
        name: "Seylan Bank (Easy Payment Plan)",
        plans: [
            { months: 3, interestRate: 4.0, label: "Handling Fee: 4.0%" },
            { months: 6, interestRate: 7.5, label: "Handling Fee: 7.5%" },
            { months: 12, interestRate: 14.0, label: "Handling Fee: 14.0%" },
            { months: 24, interestRate: 24.0, label: "Handling Fee: 24.0%" },
        ]
    },
    {
        id: "boc",
        name: "BOC (0% Installment Plan)",
        plans: [
            { months: 3, interestRate: 2.5, label: "Handling Fee: 2.5%" },
            { months: 6, interestRate: 4.5, label: "Handling Fee: 4.5%" },
            { months: 12, interestRate: 9.0, label: "Handling Fee: 9.0%" },
            { months: 24, interestRate: 16.0, label: "Handling Fee: 16.0%" },
        ]
    }
];
