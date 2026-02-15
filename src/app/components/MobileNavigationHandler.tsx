"use client";

import { useEffect } from "react";

export default function MobileNavigationHandler() {
    useEffect(() => {
        // Only apply to mobile
        if (typeof window === 'undefined' || window.innerWidth >= 768) return;

        // Prevent back navigation
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
