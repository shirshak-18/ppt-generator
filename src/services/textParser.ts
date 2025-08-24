export interface SlideContent {
  title: string;
  content: string[];
  type: "title" | "bullet";
}

export function parseTextToSlides(inputText: string): SlideContent[] {
  if (!inputText.trim()) return [];

  const lines = inputText.split('\n').map(line => line.trim()).filter(line => line);
  
  // Check if input uses markdown format (has # headings)
  const hasMarkdownHeadings = lines.some(line => line.startsWith('#'));
  
  if (hasMarkdownHeadings) {
    return parseMarkdownText(lines);
  } else {
    return parsePlainText(inputText);
  }
}

// Markdown parser
function parseMarkdownText(lines: string[]): SlideContent[] {
  const slides: SlideContent[] = [];
  let currentSlide: SlideContent | null = null;

  for (const line of lines) {
    if (line.startsWith('#')) {
      // Save previous slide
      if (currentSlide && (currentSlide.content.length > 0 || currentSlide.title)) {
        slides.push(currentSlide);
      }
      
      // Start new slide
      currentSlide = {
        title: line.replace(/^#+\s*/, ''),
        content: [],
        type: "bullet"
      };
    } else if (line.startsWith('-') || line.startsWith('*')) {
      if (currentSlide) {
        currentSlide.content.push(line.replace(/^[-*]\s*/, ''));
      } else {
        // Create first slide if no heading exists
        currentSlide = {
          title: "Presentation",
          content: [line.replace(/^[-*]\s*/, '')],
          type: "bullet"
        };
      }
    } else if (line.length > 0) {
      if (currentSlide) {
        currentSlide.content.push(line);
      } else {
        // Create first slide for plain text
        currentSlide = {
          title: generateTitleFromText(line),
          content: [],
          type: "bullet"
        };
      }
    }
  }

  // Add last slide
  if (currentSlide && (currentSlide.content.length > 0 || currentSlide.title)) {
    slides.push(currentSlide);
  }

  return slides.length > 0 ? slides : [{ title: "Presentation", content: ["No content found"], type: "bullet" }];
}

// Plain text parser - Fixed version
function parsePlainText(inputText: string): SlideContent[] {
  const cleanInput = inputText.trim();
  
  // For short input (single line/phrase), use generic title
  if (cleanInput.length < 50 && !cleanInput.includes('\n')) {
    return [{
      title: "My Presentation",
      content: [cleanInput],
      type: "bullet"
    }];
  }
  
  // For longer input, split by paragraphs
  const paragraphs = inputText.split(/\n\s*\n/).filter(p => p.trim());
  
  if (paragraphs.length === 0) {
    // Single paragraph - use generic title
    return [{
      title: "My Presentation", 
      content: [cleanInput],
      type: "bullet"
    }];
  }

  // Multiple paragraphs - each becomes a slide
  const slides: SlideContent[] = [];
  
  paragraphs.forEach((paragraph, index) => {
    const sentences = paragraph.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
    
    if (sentences.length === 1 || paragraph.length < 100) {
      // Short paragraph - use generic title
      slides.push({
        title: `Slide ${index + 1}`,
        content: [paragraph.trim()],
        type: "bullet"
      });
    } else {
      // Long paragraph - first sentence as title, rest as content
      slides.push({
        title: generateTitleFromText(sentences[0]),
        content: sentences.slice(1),
        type: "bullet"
      });
    }
  });

  return slides.length > 0 ? slides : [{ title: "My Presentation", content: ["Add your content here"], type: "bullet" }];
}

// Helper function to generate titles
function generateTitleFromText(text: string): string {
  if (!text) return "Untitled Slide";
  
  // Take first 5-6 words, remove punctuation
  const words = text.trim().split(' ').slice(0, 6);
  let title = words.join(' ');
  
  // Remove ending punctuation
  title = title.replace(/[.!?,:;]+$/, '');
  
  // Capitalize first letter
  title = title.charAt(0).toUpperCase() + title.slice(1);
  
  return title || "Untitled Slide";
}
