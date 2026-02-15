"use client";

import React, { useState, useEffect } from "react";
import styles from "./calculator/Calculator.module.css";
import Calculator from "./calculator/Calculator";

import BreakdownTable from "./calculator/BreakdownTable";
import InstallPrompt from "./components/InstallPrompt";

interface PaymentSchedule {
  month: number;
  principalPayment: number;
  interestPayment: number;
  monthlyInstallment: number;
  balance: number;
}

export default function Home() {
  // State for inputs
  const [loanAmount, setLoanAmount] = useState<number | null>(100000);
  const [interestRate, setInterestRate] = useState<number | null>(12);
  const [years, setYears] = useState<number | null>(5);

  // State for outputs
  const [emi, setEmi] = useState<number>(0);
  const [firstMonthInterest, setFirstMonthInterest] = useState<number>(0);
  const [firstMonthCapital, setFirstMonthCapital] = useState<number>(0);

  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [schedule, setSchedule] = useState<PaymentSchedule[]>([]);
  const [repaymentType, setRepaymentType] = useState<string>("equated");
  const [periodUnit, setPeriodUnit] = useState<'Year' | 'Month'>('Year');

  // Load from LocalStorage on Mount
  useEffect(() => {
    // Handle Share Target
    // Handle Share Target
    let sharedDataFound = false;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const text = params.get('text') || '';
      const title = params.get('title') || '';
      const url = params.get('url') || '';
      
      const combined = `${title} ${text} ${url}`.trim();
      if (combined) {
        const matches = combined.match(/\d+([,.]\d+)?/g);
        if (matches) {
          const values = matches.map(m => parseFloat(m.replace(/,/g, '')));
          const potentialAmount = Math.max(...values);
          if (potentialAmount > 1000) {
            setLoanAmount(potentialAmount);
            const potentialRate = values.find(v => v > 0 && v < 50 && v !== potentialAmount);
            if (potentialRate) setInterestRate(potentialRate);
            const potentialYears = values.find(v => v > 0 && v < 40 && v !== potentialAmount && v !== potentialRate);
            if (potentialYears) setYears(potentialYears);
            sharedDataFound = true;
          } else if (values.length > 0) {
            setLoanAmount(values[0]);
            sharedDataFound = true;
          }
        }
        // Clear parameters from URL without refreshing
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

    // Load Calculator Data
    if (!sharedDataFound) {
      const savedData = localStorage.getItem("loan_calculator_data");
      if (savedData) {
        try {
          const { amount, rate, time, type, unit } = JSON.parse(savedData);
          if (amount) setLoanAmount(amount);
          if (rate) setInterestRate(rate);
          if (time) setYears(time);
          if (type) setRepaymentType(type);
          if (unit && (unit === 'Year' || unit === 'Month')) setPeriodUnit(unit);
        } catch (e) {
          console.error("Failed to parse saved data", e);
        }
      }
    }
  }, []);

  // Save to LocalStorage on Change
  useEffect(() => {
    const data = { amount: loanAmount, rate: interestRate, time: years, type: repaymentType, unit: periodUnit };
    localStorage.setItem("loan_calculator_data", JSON.stringify(data));
  }, [loanAmount, interestRate, years, repaymentType, periodUnit]);

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, years, repaymentType]);

  const calculateLoan = () => {
    if (loanAmount === null || interestRate === null || years === null) {
      setEmi(0);
      setFirstMonthInterest(0);
      setFirstMonthCapital(0);
      setTotalPayment(0);
      setTotalInterest(0);
      setSchedule([]);
      return;
    }

    const principal = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;
    const numberOfPayments = years * 12;

    const newSchedule: PaymentSchedule[] = [];
    let remainingBalance = principal;
    let totalPaid = 0;
    let totalInt = 0;

    if (repaymentType === "equated") {
      let monthlyInstallment = 0;
      if (interestRate === 0) {
        monthlyInstallment = principal / numberOfPayments;
      } else {
        const numerator = principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfPayments);
        const denominator = Math.pow(1 + ratePerMonth, numberOfPayments) - 1;
        monthlyInstallment = numerator / denominator;
      }

      for (let i = 1; i <= numberOfPayments; i++) {
        const interest = remainingBalance * ratePerMonth;
        const capital = monthlyInstallment - interest;
        remainingBalance -= capital;

        if (i === numberOfPayments && Math.abs(remainingBalance) < 1) {
          remainingBalance = 0;
        }

        newSchedule.push({
          month: i,
          principalPayment: capital,
          interestPayment: interest,
          monthlyInstallment: monthlyInstallment,
          balance: remainingBalance > 0 ? remainingBalance : 0,
        });
        totalPaid += monthlyInstallment;
        totalInt += interest;
      }
      setEmi(monthlyInstallment);
    } else {
      // Reducing Balance - Equated Principal
      const equatedPrincipal = principal / numberOfPayments;
      for (let i = 1; i <= numberOfPayments; i++) {
        const interest = remainingBalance * ratePerMonth;
        const installment = equatedPrincipal + interest;
        remainingBalance -= equatedPrincipal;

        if (i === numberOfPayments && Math.abs(remainingBalance) < 1) {
          remainingBalance = 0;
        }

        newSchedule.push({
          month: i,
          principalPayment: equatedPrincipal,
          interestPayment: interest,
          monthlyInstallment: installment,
          balance: remainingBalance > 0 ? remainingBalance : 0,
        });
        totalPaid += installment;
        totalInt += interest;
      }
      // For reducing balance, show the first month's installment
      setEmi(newSchedule[0]?.monthlyInstallment || 0);
    }

    setFirstMonthInterest(newSchedule[0]?.interestPayment || 0);
    setFirstMonthCapital(newSchedule[0]?.principalPayment || 0);
    setTotalPayment(totalPaid);
    setTotalInterest(totalInt);
    setSchedule(newSchedule);
  };

  return (
    <main className={styles.main}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Loan Calculator</h1>
        </div>
        <div className="row g-0 g-md-4 justify-content-center align-items-start">
          <div className="col-12 col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 d-flex justify-content-center">
            <Calculator
              loanAmount={loanAmount}
              setLoanAmount={setLoanAmount}
              interestRate={interestRate}
              setInterestRate={setInterestRate}
              years={years}
              setYears={setYears}
              emi={emi}
              firstMonthInterest={firstMonthInterest}

              firstMonthCapital={firstMonthCapital}
              totalPayment={totalPayment}
              totalInterest={totalInterest}
              repaymentType={repaymentType}
              setRepaymentType={setRepaymentType}
              periodUnit={periodUnit}
              setPeriodUnit={setPeriodUnit}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-7 col-xl-8">
            <BreakdownTable schedule={schedule} />
          </div>
        </div>
      </div>
      <InstallPrompt />
    </main>
  );
}
