// src/components/TextInput.tsx
import React from "react";

interface TextInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  rows?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  placeholder = "Enter your text here...",
  onChange,
  rows = 8,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: "100%",
        fontSize: "1rem",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontFamily: "inherit",
        resize: "vertical",
        boxSizing: "border-box"
      }}
    />
  );
};

export default TextInput;
