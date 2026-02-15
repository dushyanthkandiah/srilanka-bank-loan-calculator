import React from "react";
import styles from "./QRCodeGenerator.module.css";

interface QRCodeGeneratorViewProps {
    text: string;
    setText: (text: string) => void;
    qrRef: React.RefObject<HTMLDivElement | null>;
    qrImageSrc: string | null;
    handleCopyText: () => void;
    handleDownload: () => void;
    copyStatus: string | null;
}

/**
 * QRCodeGenerator View (Template)
 * Purely presentational component for the QR code generator.
 */
export default function QRCodeGeneratorView(props: QRCodeGeneratorViewProps) {
    const {
        text, setText, qrRef, qrImageSrc,
        handleCopyText, handleDownload, copyStatus
    } = props;

    return (
        <main className={`container py-4 ${styles.container}`}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 mb-0" style={{ color: 'var(--primary)' }}>QR Generator</h1>
            </div>

            <div className={`card p-3 text-center ${styles.qrCard}`}>
                <div className="mb-4 text-start">
                    <label className="form-label" style={{ color: 'var(--text-muted)' }}>Shared Content / Text</label>
                    <textarea
                        className={`form-control ${styles.textarea}`}
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
                        className={styles.hiddenQR}
                    />

                    {/* Actual image for user interaction (long-press support) */}
                    {qrImageSrc ? (
                        <img
                            src={qrImageSrc}
                            alt="Generated QR Code"
                            className={styles.qrImage}
                        />
                    ) : (
                        <div className={styles.qrPlaceholder} />
                    )}
                </div>

                <small className="mb-3" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                    {copyStatus ? (
                        <span className="text-success fw-bold">{copyStatus}</span>
                    ) : (
                        "Long press the QR code to copy it on mobile devices. Use the buttons below to download or copy the URL/text."
                    )}
                </small>

                <div className="d-grid gap-2">
                    <button
                        className="btn btn-primary"
                        style={{ borderRadius: 'var(--radius)', padding: '12px' }}
                        onClick={handleDownload}
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
