"use client";
import { useState, useEffect } from "react";

export function DashboardFooter() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("disclaimer-seen");
    if (!seen) setShowModal(true);
  }, []);

  function dismiss() {
    localStorage.setItem("disclaimer-seen", "1");
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-yellow-600 mb-3">⚠️ Risk Disclaimer</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              Aplikasi ini hanya untuk keperluan <strong>edukasi dan simulasi</strong>. Trading forex
              memiliki risiko tinggi dan dapat mengakibatkan kerugian seluruh modal Anda. Kami bukan
              penasihat keuangan. Pengguna sepenuhnya bertanggung jawab atas keputusan trading.
              Di Indonesia, penggunaan bot trading tunduk pada regulasi <strong>BAPPEBTI</strong>.
            </p>
            <button onClick={dismiss}
              className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
              Saya Mengerti & Setuju
            </button>
          </div>
        </div>
      )}
      <footer className="text-center text-xs text-gray-400 py-4 border-t dark:border-gray-700">
        ForexTrader v3 – For educational purposes only. High risk of loss.{" "}
        <button onClick={() => setShowModal(true)} className="underline">Risk Disclaimer</button>
      </footer>
    </>
  );
}
