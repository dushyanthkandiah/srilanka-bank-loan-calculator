"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "../../app/context/ThemeContext";
import NavbarView from "./Navbar.view";

/**
 * Navbar Component (Controller)
 * Handles logic for the top navigation bar.
 */
export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();
    const pathname = usePathname();

    const getPageTitle = () => {
        if (pathname === "/") return "Calculator";
        if (pathname === "/generate-qr") return "QR Generator";
        return "LK Super";
    };

    return (
        <NavbarView 
            isDark={isDark} 
            toggleTheme={toggleTheme} 
            pathname={pathname} 
            pageTitle={getPageTitle()} 
        />
    );
}
