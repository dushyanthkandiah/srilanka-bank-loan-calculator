"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();
    const pathname = usePathname();

    return (
        <nav className="navbar navbar-expand navbar-light mb-4" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border-color)' }}>
            <div className="container">
                <Link href="/" className="navbar-brand d-flex align-items-center" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                    LK Super
                </Link>
                
                <div className="d-flex align-items-center">
                    <ul className="navbar-nav d-flex flex-row me-3">
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
                        <li className="nav-item d-flex align-items-center">
                            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
