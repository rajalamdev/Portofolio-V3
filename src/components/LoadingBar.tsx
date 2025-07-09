import React from "react";

const LoadingBar: React.FC<{ show: boolean }> = ({ show }) => (
  <div
    className={`
      fixed top-0 left-0 w-full h-1 z-50
      transition-opacity duration-500
      ${show ? "opacity-100" : "opacity-0 pointer-events-none"}
    `}
  >
    <div className="h-full bg-blue-500 animate-loading-bar" />
  </div>
);

export default LoadingBar;
