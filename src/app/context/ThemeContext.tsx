"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Load Theme
        const savedTheme = localStorage.getItem("is_dark_theme");
        if (savedTheme !== null) {
            const isDarkSaved = JSON.parse(savedTheme);
            setIsDark(isDarkSaved);
            if (!isDarkSaved) document.body.classList.add("light");
        } else {
            // Default is dark, so if not saved, it is dark (and 'light' class is not present)
            setIsDark(true);
        }
    }, []);

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

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
