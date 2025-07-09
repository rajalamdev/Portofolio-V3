import React, { useEffect } from "react";

interface AlertProps {
  type: "success" | "error";
  message: string | string[];
  onClose: () => void;
  duration?: number;
  showLoadingBar?: boolean;
}

const icons = {
  success: (
    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#bbf7d0"/>
      <path d="M8 12.5l2.5 2.5 5-5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#fecaca"/>
      <path d="M9 9l6 6M15 9l-6 6" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  onClose,
  duration = 2000,
  showLoadingBar = false,
}) => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (!showLoadingBar) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 500); // waktu fade out
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration, showLoadingBar]);

  return (
    <div
      className={
        `fixed top-8 right-8 z-50
        min-w-[280px] max-w-[90vw] sm:max-w-md
        pl-6 pr-10 pt-4 pb-3 rounded-xl shadow-2xl
        flex flex-col items-start gap-2
        bg-gradient-to-br
        ${type === "success"
          ? "from-green-100 to-green-50 border-l-4 border-accent"
          : "from-red-100 to-red-50 border-l-4 border-red-500"}
        animate-fade-in-out
        ${!visible ? 'opacity-0 transition-opacity duration-500' : ''}`
      }
      style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition"
        aria-label="Tutup"
        tabIndex={0}
        type="button"
      >
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z" clipRule="evenodd" />
        </svg>
      </button>
      <div className="flex items-center gap-3">
        {icons[type]}
        <div className="text-sm sm:text-base text-gray-800 font-medium">
          {Array.isArray(message) ? (
            <ul className="list-disc list-inside text-left">
              {message.map((msg, i) => <li key={i}>{msg}</li>)}
            </ul>
          ) : message}
        </div>
      </div>
      {showLoadingBar && (
        <div className="absolute left-0 bottom-0 w-full h-[3px] overflow-hidden">
          <div className={`h-full w-full animate-loading-bar rounded-b-xl ${type === "success" ? "bg-accent" : "bg-red-500"}`} />
        </div>
      )}
    </div>
  );
};

export default Alert;
