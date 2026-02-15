"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();
    const pathname = usePathname();

    const getPageTitle = () => {
        if (pathname === "/") return "Calculator";
        if (pathname === "/generate-qr") return "QR Generator";
        return "LK Super";
    };

    return (
        <nav className="navbar navbar-expand navbar-light fixed-top" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border-color)' }}>
            <div className="container">
                {/* Desktop Link, Mobile Text */}
                <Link href="/" className="navbar-brand d-none d-md-flex align-items-center" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                    {getPageTitle()}
                </Link>
                <div className="navbar-brand d-flex d-md-none align-items-center" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                    {getPageTitle()}
                </div>
                
                <div className="d-flex align-items-center">
                    <ul className="navbar-nav d-flex flex-row me-3 d-none d-md-flex">
                        <li className="nav-item me-3">
                            <Link 
                                href="/" 
                                className={`nav-link ${pathname === '/' ? 'active' : ''}`}
                                style={{ color: pathname === '/' ? 'var(--primary)' : 'var(--text-muted)' }}
                            >
                                Calculator
                            </Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link 
                                href="/generate-qr" 
                                className={`nav-link ${pathname === '/generate-qr' ? 'active' : ''}`}
                                style={{ color: pathname === '/generate-qr' ? 'var(--primary)' : 'var(--text-muted)' }}
                            >
                                QR
                            </Link>
                        </li>
                    </ul>
                    <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
                </div>
            </div>
        </nav>
    );
}
