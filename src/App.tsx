import { useState, useMemo } from "react";
import TextInput from "./components/TextInput";
import TemplateSelector from "./components/TemplateSelector";
import SlidePreview from "./components/SlidePreview";
import LLMInputs from "./components/LLMInputs";
import { parseTextToSlides, type SlideContent } from "./services/textParser";
import { enhanceTextWithLLM } from "./services/llmService";
import { generatePPT } from "./services/pptGenerator";

const templates = [
  { value: "blue", label: "Professional Blue" },
  { value: "green", label: "Academic Green" },
  { value: "red", label: "Corporate Red" },
  { value: "dark", label: "Modern Dark" },
];

function App() {
  const [input, setInput] = useState("# My Presentation\n- Point 1\n- Point 2");
  const [selectedTemplate, setSelectedTemplate] = useState("blue");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState<SlideContent[]>([]);
  const [pptReady, setPptReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // LLM-related state
  const [apiKey, setApiKey] = useState("");
  const [guidance, setGuidance] = useState("");
  const [provider, setProvider] = useState("openai");
  const [useLLM, setUseLLM] = useState(false);

  // Live preview with basic parser
  const parsedSlides = useMemo(() => parseTextToSlides(input), [input]);

  const handleGenerate = async () => {
    if (input.trim().length === 0) {
      alert("Please enter some content to generate slides.");
      return;
    }

    setIsGenerating(true);
    
    try {
      let generatedSlides: SlideContent[];
      
      if (useLLM && apiKey.trim()) {
        // Use LLM for enhanced parsing
        generatedSlides = await enhanceTextWithLLM(input, {
          provider,
          apiKey,
          guidance,
        });
      } else {
        // Use basic parser
        generatedSlides = parseTextToSlides(input);
      }

      setSlides(generatedSlides);
      setPptReady(true);
      setCurrentSlideIndex(0);
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Failed to generate slides. Using basic parsing.");
      // Fallback to basic parser
      setSlides(parseTextToSlides(input));
      setPptReady(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!pptReady) return;
    generatePPT(slides, selectedTemplate);
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlideIndex(index);
  };

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-700">PPT Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <TextInput
            value={input}
            onChange={setInput}
            placeholder="# Title Slide\n- Bullet 1\n- Bullet 2"
            rows={10}
          />

          <TemplateSelector
            templates={templates}
            selected={selectedTemplate}
            onChange={setSelectedTemplate}
          />
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-md">
            <label className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                checked={useLLM}
                onChange={(e) => setUseLLM(e.target.checked)}
              />
              <span>Use AI for enhanced parsing</span>
            </label>

            {useLLM && (
              <LLMInputs
                apiKey={apiKey}
                onApiKeyChange={setApiKey}
                guidance={guidance}
                onGuidanceChange={setGuidance}
                provider={provider}
                onProviderChange={setProvider}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isGenerating ? "Generating..." : "Generate Slides"}
        </button>

        <button
          onClick={handleDownload}
          disabled={!pptReady}
          className="flex-1 py-3 px-6 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download PPT
        </button>
      </div>

      <SlidePreview
        slides={slides.length > 0 ? slides : parsedSlides}
        currentSlideIndex={currentSlideIndex}
        onSlideChange={handleSlideChange}
      />


    </main>
  );
}

export default App;
