// src/types/index.ts

// Defines the structure of each slide's content
export interface SlideContent {
  title: string;         // Slide title text
  content: string[];     // Array of bullet points or content lines
  type: "title" | "bullet";  // Slide type: title slide or bullet content slide
}

// Represents a presentation template's basic info
export interface Template {
  id: string;            // Unique identifier (e.g., "blue", "red")
  name: string;          // Human-readable template name
  primaryColor: string;  // Primary hex color used for titles/headings
  secondaryColor: string;// Secondary hex color for accents/background
  description?: string;  // Optional template description for UI
}
