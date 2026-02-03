"use client";

import React, { useState, useEffect } from "react";
import styles from "./components/Calculator.module.css";
import Calculator from "./components/Calculator";

import BreakdownTable from "./components/BreakdownTable";
import ThemeToggle from "./components/ThemeToggle";

interface PaymentSchedule {
  month: number;
  principalPayment: number;
  interestPayment: number;
  monthlyInstallment: number;
  balance: number;
}

export default function Home() {
  // State for inputs
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [years, setYears] = useState<number>(5);

  // State for outputs
  const [emi, setEmi] = useState<number>(0);
  const [firstMonthInterest, setFirstMonthInterest] = useState<number>(0);
  const [firstMonthCapital, setFirstMonthCapital] = useState<number>(0);

  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [schedule, setSchedule] = useState<PaymentSchedule[]>([]);
  const [isDark, setIsDark] = useState<boolean>(true);

  // Load from LocalStorage on Mount
  useEffect(() => {
    // Load Calculator Data
    const savedData = localStorage.getItem("loan_calculator_data");
    if (savedData) {
      try {
        const { amount, rate, time } = JSON.parse(savedData);
        if (amount) setLoanAmount(amount);
        if (rate) setInterestRate(rate);
        if (time) setYears(time);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }

    // Load Theme Data
    const savedTheme = localStorage.getItem("is_dark_theme");
    if (savedTheme !== null) {
      const isDarkSaved = JSON.parse(savedTheme);
      setIsDark(isDarkSaved);
      if (!isDarkSaved) {
        document.body.classList.add("light");
      }
    }
  }, []);

  // Toggle Theme
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("is_dark_theme", JSON.stringify(newIsDark));

    if (newIsDark) {
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
    }
  };



  // Save to LocalStorage on Change
  useEffect(() => {
    const data = { amount: loanAmount, rate: interestRate, time: years };
    localStorage.setItem("loan_calculator_data", JSON.stringify(data));
  }, [loanAmount, interestRate, years]);

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, years]);

  const calculateLoan = () => {
    const principal = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;
    const numberOfPayments = years * 12;

    let monthlyInstallment = 0;

    if (interestRate === 0) {
      monthlyInstallment = principal / numberOfPayments;
    } else {
      const numerator = principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfPayments);
      const denominator = Math.pow(1 + ratePerMonth, numberOfPayments) - 1;
      monthlyInstallment = numerator / denominator;
    }

    // Set First Month Data
    const firstInterest = principal * ratePerMonth;
    const firstCapital = monthlyInstallment - firstInterest;

    setEmi(monthlyInstallment);
    setFirstMonthInterest(firstInterest);
    setFirstMonthCapital(firstCapital);

    // Set Totals
    const totalPay = monthlyInstallment * numberOfPayments;
    const totalInt = totalPay - principal;
    setTotalPayment(totalPay);
    setTotalInterest(totalInt > 0 ? totalInt : 0);

    // Generate Schedule
    const newSchedule: PaymentSchedule[] = [];
    let remainingBalance = principal;

    for (let i = 1; i <= numberOfPayments; i++) {
      const interest = remainingBalance * ratePerMonth;
      const capital = monthlyInstallment - interest;
      remainingBalance -= capital;

      // Handle floating point precision for last payment
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
    }
    setSchedule(newSchedule);
  };

  return (
    <main className={`${styles.container} ${!isDark ? "light" : ""}`}>
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <div className="container-fluid">
        <div className="row justify-content-center align-items-start">
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
            />
          </div>
          <div className="col-12 col-md-6 col-lg-7 col-xl-8">
            <BreakdownTable schedule={schedule} />
          </div>
        </div>
      </div>
    </main>
  );
}
