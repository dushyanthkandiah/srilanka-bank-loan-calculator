"use client";

import React from "react";
import { usePathname } from "next/navigation";
import BottomNavView from "./BottomNav.view";

/**
 * BottomNav Component (Controller)
 * Handles logic and state for the bottom navigation bar.
 */
export default function BottomNav() {
    const pathname = usePathname();

    const handleTap = (e: React.MouseEvent, href: string) => {
        // Prevent redundant navigation if already on the page (native app feel)
        if (pathname === href) {
            e.preventDefault();
        }
        
        // Short haptic feedback for better touch experience
        if (typeof window !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(10);
        }
    };

    return <BottomNavView pathname={pathname} handleTap={handleTap} />;
}
