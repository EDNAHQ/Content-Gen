import React from "react";

export const Logo = ({ className = "", size = 40 }: { className?: string; size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient definition */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#9b87f5", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#7c5cff", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Main circle background */}
      <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
      
      {/* Stylized "E" */}
      <path
        d="M35 30H65M35 50H60M35 70H65"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
      />
      
      {/* Digital accent lines */}
      <path
        d="M70 25L75 25M70 50L75 50M70 75L75 75"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
};

export default Logo;