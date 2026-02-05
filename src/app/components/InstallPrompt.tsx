"use client";

import React, { useEffect, useState } from "react";

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsStandalone(true);
        }

        // Check for iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        setIsIOS(/iphone|ipad|ipod/.test(userAgent));

        // Capture install prompt
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            setDeferredPrompt(null);
        }
    };

    if (isStandalone) {
        return null;
    }

    return (
        <>
            {deferredPrompt && (
                <button
                    onClick={handleInstallClick}
                    className="btn btn-primary position-fixed bottom-0 end-0 m-4 shadow-lg z-3"
                    style={{ borderRadius: "50px", padding: "10px 20px" }}
                >
                    Install App
                </button>
            )}
            {isIOS && (
                <div className="alert alert-info position-fixed bottom-0 start-0 end-0 m-3 z-3" role="alert">
                    To install this app on iOS, tap the Share button and select "Add to Home Screen".
                    <button type="button" className="btn-close float-end" onClick={() => setIsIOS(false)}></button>
                </div>
            )}
        </>
    );
}
