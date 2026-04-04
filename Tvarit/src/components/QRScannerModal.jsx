import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { XCircle } from 'lucide-react';

const QRScannerModal = ({ onScan, onClose }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { 
      fps: 10, 
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: true,
      supportedScanTypes: [0] // Camera only
    });

    scanner.render(onScan, (err) => {
      // Quietly wait for frames
    });

    return () => {
        scanner.clear().catch(error => {
            console.error("Failed to clear scanner. ", error);
        });
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <XCircle className="w-8 h-8" />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Scan Ticket QR</h2>
        <div id="reader" className="overflow-hidden rounded-xl bg-gray-100 min-h-[300px]"></div>
        <p className="mt-4 text-center text-sm text-gray-500">
          Point your camera at the QR code on your ticket
        </p>
      </div>
    </div>
  );
};

export default QRScannerModal;
