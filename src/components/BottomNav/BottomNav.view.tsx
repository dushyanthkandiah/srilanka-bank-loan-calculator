import React from "react";
import Link from "next/link";
import styles from "./BottomNav.module.css";

interface BottomNavViewProps {
    pathname: string;
    handleTap: (e: React.MouseEvent, href: string) => void;
}

/**
 * BottomNav View (Template)
 * Purely presentational component for the bottom navigation bar.
 */
export default function BottomNavView({ pathname, handleTap }: BottomNavViewProps) {
    return (
        <div className={`d-md-none fixed-bottom ${styles.bottomNav}`}>
            <div className="d-flex justify-content-center align-items-center h-100 gap-3">
                <Link 
                    href="/" 
                    className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}
                    onClick={(e) => handleTap(e, '/')}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    <span>Home</span>
                </Link>
                <Link 
                    href="/generate-qr" 
                    className={`${styles.navItem} ${pathname === '/generate-qr' ? styles.active : ''}`}
                    onClick={(e) => handleTap(e, '/generate-qr')}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><rect width="7" height="7" x="7" y="7"/><rect width="3" height="3" x="14" y="7"/><rect width="3" height="3" x="7" y="14"/><rect width="3" height="3" x="14" y="14"/></svg>
                    <span>QR</span>
                </Link>
            </div>
        </div>
    );
}
