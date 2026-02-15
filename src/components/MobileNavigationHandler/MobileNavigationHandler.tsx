"use client";

import { useEffect } from "react";

/**
 * MobileNavigationHandler Component
 * Handles specialized mobile navigation behavior like back-button prevention.
 */
export default function MobileNavigationHandler() {
    useEffect(() => {
        // Only apply to mobile
        if (typeof window === 'undefined' || window.innerWidth >= 768) return;

        // Prevent back navigation to maintain app state
        const preventBack = () => {
            window.history.pushState(null, "", window.location.href);
        };

        // Initial push to have something to pop
        window.history.pushState(null, "", window.location.href);
        
        window.addEventListener('popstate', preventBack);

        return () => {
            window.removeEventListener('popstate', preventBack);
        };
    }, []);

    return null;
}
