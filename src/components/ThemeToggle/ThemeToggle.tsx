"use client";

import React from "react";
import ThemeToggleView from "./ThemeToggle.view";

interface ThemeToggleProps {
    isDark: boolean;
    toggleTheme: () => void;
}

/**
 * ThemeToggle Component (Controller)
 * Logic for switching between dark and light themes.
 */
export default function ThemeToggle(props: ThemeToggleProps) {
    return <ThemeToggleView {...props} />;
}
