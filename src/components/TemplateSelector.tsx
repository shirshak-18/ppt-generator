// src/components/TemplateSelector.tsx
import React from "react";

interface TemplateOption {
  value: string;
  label: string;
}

export interface TemplateSelectorProps {
  templates: TemplateOption[];
  selected: string;
  onChange: (value: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selected,
  onChange,
}) => {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "8px 12px",
        fontSize: "1rem",
        borderRadius: "6px",
        border: "1px solid #ccc",
        width: "100%",
        maxWidth: 300,
        cursor: "pointer",
      }}
    >
      {templates.map((template) => (
        <option key={template.value} value={template.value}>
          {template.label}
        </option>
      ))}
    </select>
  );
};

export default TemplateSelector;
