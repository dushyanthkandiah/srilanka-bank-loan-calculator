"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTheme } from "../../app/context/ThemeContext";
import QRCodeGeneratorView from "./QRCodeGenerator.view";

/**
 * QRCodeGenerator Component (Controller)
 * Handles logic for generating QR codes, haptic feedback, and text copying.
 */
export default function QRCodeGenerator() {
    const searchParams = useSearchParams();
    const [text, setText] = useState("");
    const [copyStatus, setCopyStatus] = useState<string | null>(null);
    const qrRef = useRef<HTMLDivElement>(null);
    const { isDark } = useTheme();
    const qrCodeInstance = useRef<any>(null);
    const [qrImageSrc, setQrImageSrc] = useState<string | null>(null);

    useEffect(() => {
        const sharedText = searchParams.get("text") || "";
        if (sharedText) {
            setText(sharedText);
        }
    }, [searchParams]);

    useEffect(() => {
        let isMounted = true;

        // Dynamic import to avoid SSR issues with qr-code-styling
        import("qr-code-styling").then((QRCodeStyling) => {
            if (!isMounted || !qrRef.current) return;

            const Constructor = QRCodeStyling.default || QRCodeStyling;

            if (!qrCodeInstance.current) {
                qrCodeInstance.current = new Constructor({
                    width: 350,
                    height: 350,
                    data: text || "https://lk-loan.vercel.app",
                    dotsOptions: {
                        type: "rounded",
                        gradient: {
                            type: "linear",
                            rotation: 180,
                            colorStops: [
                                { offset: 0, color: "#ffffff" },
                                { offset: 1, color: "#afe1ff" }
                            ]
                        }
                    },
                    cornersSquareOptions: {
                        type: "extra-rounded",
                        color: "#3da4ff"
                    },
                    backgroundOptions: {
                        color: "#1e293b",
                    },
                    imageOptions: {
                        crossOrigin: "anonymous",
                        margin: 0
                    }
                });

                if (qrRef.current) {
                    qrRef.current.innerHTML = "";
                    qrCodeInstance.current.append(qrRef.current);
                }
            } else {
                qrCodeInstance.current.update({
                    data: text || "https://lk-loan.vercel.app"
                });
            }

            // Convert canvas to image source for better mobile support
            setTimeout(() => {
                if (isMounted && qrRef.current) {
                    const canvas = qrRef.current.querySelector("canvas");
                    if (canvas) {
                        try {
                            setQrImageSrc(canvas.toDataURL("image/png"));
                        } catch (e) {
                            console.error("Failed to generate image src", e);
                        }
                    }
                }
            }, 50);

        }).catch(err => {
            console.error("Error loading qr-code-styling:", err);
        });

        return () => {
            isMounted = false;
        };
    }, [text, isDark]);

    useEffect(() => {
        if (copyStatus) {
            const timer = setTimeout(() => setCopyStatus(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [copyStatus]);

    const handleCopyText = async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                setCopyStatus("URL copied!");
            } else {
                // Fallback
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    setCopyStatus("URL copied!");
                } catch (err) {
                    setCopyStatus("Copy failed");
                }
                document.body.removeChild(textArea);
            }
        } catch (err) {
            setCopyStatus("Copy failed");
        }
    };

    const handleDownload = () => {
        qrCodeInstance.current?.download({ name: "qr-code", extension: "png" });
    };

    return (
        <QRCodeGeneratorView
            text={text}
            setText={setText}
            qrRef={qrRef}
            qrImageSrc={qrImageSrc}
            handleCopyText={handleCopyText}
            handleDownload={handleDownload}
            copyStatus={copyStatus}
        />
    );
}
