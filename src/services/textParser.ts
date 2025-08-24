// types for slide structure
export interface SlideContent {
  title: string;
  content: string[];
  type: 'title' | 'bullet';
}

export const parseTextToSlides = (text: string): SlideContent[] => {
  const lines = text.split('\n');
  const slides: SlideContent[] = [];
  let currentSlide: SlideContent | null = null;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      // New slide
      if (currentSlide) slides.push(currentSlide);
      currentSlide = {
        title: trimmed.substring(2).trim(),
        content: [],
        type: 'title'
      };
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!currentSlide) {
        // If no heading before, create untitled slide
        currentSlide = {
          title: "Untitled",
          content: [],
          type: 'bullet'
        };
      }
      currentSlide.content.push(trimmed.substring(2).trim());
      currentSlide.type = 'bullet';
    }
    // (Optionally handle plain paragraphs as content here)
  });

  // Add the last slide if present
  if (currentSlide) slides.push(currentSlide);

  return slides;
};
