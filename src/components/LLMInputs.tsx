import React from "react";

interface LLMInputsProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  guidance: string;
  onGuidanceChange: (guidance: string) => void;
  provider: string;
  onProviderChange: (provider: string) => void;
}

const providers = [
  { value: "openai", label: "OpenAI (GPT)" },
  { value: "anthropic", label: "Anthropic (Claude)" },
  { value: "google", label: "Google (Gemini)" },
];

const LLMInputs: React.FC<LLMInputsProps> = ({
  apiKey,
  onApiKeyChange,
  guidance,
  onGuidanceChange,
  provider,
  onProviderChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          LLM Provider:
        </label>
        <select
          value={provider}
          onChange={(e) => onProviderChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          {providers.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          API Key:
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder="Enter your LLM API key (never stored)"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Guidance (optional):
        </label>
        <input
          type="text"
          value={guidance}
          onChange={(e) => onGuidanceChange(e.target.value)}
          placeholder="e.g., 'investor pitch deck', 'technical presentation'"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default LLMInputs;
