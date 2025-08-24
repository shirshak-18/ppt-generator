// src/components/DownloadButton.tsx
import React from "react";

interface DownloadButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  onClick,
  disabled = false,
  label = "Download PPT"
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 20px",
        fontSize: "1rem",
        borderRadius: "5px",
        backgroundColor: disabled ? "#ccc" : "#2563eb",
        color: disabled ? "#666" : "#fff",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background-color 0.3s ease"
      }}
    >
      {label}
    </button>
  );
};

export default DownloadButton;
