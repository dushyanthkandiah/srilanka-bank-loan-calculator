import React from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "./Navbar.module.css";

interface NavbarViewProps {
    isDark: boolean;
    toggleTheme: () => void;
    pathname: string;
    pageTitle: string;
}

/**
 * Navbar View (Template)
 * Purely presentational component for the top navigation bar.
 */
export default function NavbarView({ isDark, toggleTheme, pathname, pageTitle }: NavbarViewProps) {
    return (
        <nav className={`navbar navbar-expand navbar-light fixed-top ${styles.navbar}`}>
            <div className="container">
                {/* Desktop Link, Mobile Text */}
                <Link href="/" className="navbar-brand d-none d-md-flex align-items-center" style={{ fontWeight: 'bold' }}>
                    {pageTitle}
                </Link>
                <div className="navbar-brand d-flex d-md-none align-items-center" style={{ fontWeight: 'bold' }}>
                    {pageTitle}
                </div>
                
                <div className="d-flex align-items-center">
                    <ul className="navbar-nav d-flex flex-row me-3 d-none d-md-flex">
                        <li className="nav-item me-3">
                            <Link 
                                href="/" 
                                className={`nav-link ${pathname === '/' ? 'active' : ''}`}
                            >
                                Calculator
                            </Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link 
                                href="/generate-qr" 
                                className={`nav-link ${pathname === '/generate-qr' ? 'active' : ''}`}
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
