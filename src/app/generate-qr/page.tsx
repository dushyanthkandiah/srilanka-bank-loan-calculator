"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "../context/ThemeContext";

function QRCodeGeneratorContent() {
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
                    width: 300,
                    height: 300,
                    data: text || "https://lk-loan.vercel.app",
                    dotsOptions: {
                        type: "rounded",
                        gradient: {
                            type: "linear",
                            rotation: 180, // 46 degrees in radians
                            colorStops: [
                                { offset: 0, color: "#ffffff" }, // Dark Magenta/Purple
                                { offset: 1, color: "#daf1ff" }  // Dark Green
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
                        margin: 20
                    }
                });
                // Ensure container is empty before appending
                if (qrRef.current) {
                    qrRef.current.innerHTML = "";
                    qrCodeInstance.current.append(qrRef.current);
                }
            } else {
                qrCodeInstance.current.update({
                    data: text || "https://lk-loan.vercel.app",
                    dotsOptions: {
                        color: "#ffffff"
                    },
                    backgroundOptions: {
                        color: "#1e293b"
                    }
                });
            }

            // Convert canvas to image source for better mobile support (long-press to copy)
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
                    console.error("Fallback copy failed", err);
                    setCopyStatus("Copy failed");
                }
                document.body.removeChild(textArea);
            }
        } catch (err) {
            console.error("Failed to copy text: ", err);
            setCopyStatus("Copy failed");
        }
    };

    return (
        <main className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 mb-0" style={{ color: 'var(--primary)' }}>QR Generator</h1>
            </div>

            <div className="card p-3 text-center" style={{
                backgroundColor: 'var(--surface)',
                color: 'var(--foreground)',
                borderColor: 'var(--border-color)',
                borderRadius: 'var(--radius)'
            }}>
                <div className="mb-4 text-start">
                    <label className="form-label" style={{ color: 'var(--text-muted)' }}>Shared Content / Text</label>
                    <textarea
                        className="form-control"
                        style={{
                            backgroundColor: 'var(--surface-highlight)',
                            color: 'var(--foreground)',
                            borderColor: 'var(--border-color)',
                            borderRadius: '8px'
                        }}
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Shared text will appear here..."
                    />
                </div>

                <div className="d-flex justify-content-center mb-2">
                    {/* Hidden container for library rendering */}
                    <div
                        ref={qrRef}
                        style={{
                            position: 'absolute',
                            width: 0,
                            height: 0,
                            overflow: 'hidden',
                            opacity: 0,
                            pointerEvents: 'none'
                        }}
                    />

                    {/* Actual image for user interaction (long-press support) */}
                    {qrImageSrc ? (
                        <img
                            src={qrImageSrc}
                            alt="Generated QR Code"
                            style={{
                                padding: "10px",
                                borderRadius: "12px",
                                display: "inline-block",
                                maxWidth: "100%",
                                height: "auto",
                                backgroundColor: "var(--surface-highlight)"
                            }}
                        />
                    ) : (
                        <div style={{
                            width: 300,
                            height: 300,
                            background: 'var(--surface-highlight)',
                            borderRadius: "12px"
                        }} />
                    )}
                </div>

                <small className="mb-3" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                    Long press the QR code to copy it on mobile devices. Use the buttons below to download or copy the URL/text.
                </small>

                <div className="d-grid gap-2">
                    <button
                        className="btn btn-primary"
                        style={{ borderRadius: 'var(--radius)', padding: '12px' }}
                        onClick={() => qrCodeInstance.current?.download({ name: "qr-code", extension: "png" })}
                        disabled={!text}
                    >
                        Download QR Code
                    </button>

                    <button
                        className="btn btn-outline-primary"
                        style={{ borderRadius: 'var(--radius)', padding: '12px' }}
                        onClick={handleCopyText}
                        disabled={!text}
                    >
                        Copy URL/Text
                    </button>
                </div>
            </div>
        </main>
    );
}

export default function GenerateQRPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <QRCodeGeneratorContent />
        </Suspense>
    );
}
