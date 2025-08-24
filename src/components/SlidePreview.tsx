// src/components/SlidePreview.tsx
import React from "react";

interface SlideContent {
  title: string;
  content: string[];
  type: "title" | "bullet";
}

interface SlidePreviewProps {
  slides: SlideContent[];
  currentSlideIndex?: number;
  onSlideChange?: (index: number) => void;
}

const SlidePreview: React.FC<SlidePreviewProps> = ({
  slides,
  currentSlideIndex = 0,
  onSlideChange,
}) => {
  if (slides.length === 0) {
    return <div style={{ padding: "1rem", fontStyle: "italic" }}>No preview available</div>;
  }

  const currentSlide = slides[currentSlideIndex];

  const handlePrev = () => {
    if (onSlideChange && currentSlideIndex > 0) {
      onSlideChange(currentSlideIndex - 1);
    }
  };

  const handleNext = () => {
    if (onSlideChange && currentSlideIndex < slides.length - 1) {
      onSlideChange(currentSlideIndex + 1);
    }
  };

  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "1rem",
      maxWidth: 600,
      backgroundColor: "#f9f9f9"
    }}>
      <h3 style={{ borderBottom: "1px solid #ddd", paddingBottom: "0.5rem" }}>
        Slide {currentSlideIndex + 1} of {slides.length}
      </h3>
      <h2 style={{ fontSize: "1.5rem", margin: "1rem 0" }}>{currentSlide.title}</h2>
      <ul style={{ paddingLeft: "1.2rem" }}>
        {currentSlide.content.map((line, idx) => (
          <li key={`content-${idx}`} style={{ marginBottom: "0.4rem" }}>
            {line}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          style={{ marginRight: 10, padding: "6px 12px", cursor: currentSlideIndex === 0 ? "not-allowed" : "pointer" }}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentSlideIndex === slides.length - 1}
          style={{ padding: "6px 12px", cursor: currentSlideIndex === slides.length - 1 ? "not-allowed" : "pointer" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SlidePreview;
