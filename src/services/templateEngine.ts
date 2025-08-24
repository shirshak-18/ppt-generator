// src/services/templateEngine.ts

interface Template {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  description?: string;
}

const templates: Template[] = [
  {
    id: "blue",
    name: "Professional Blue",
    primaryColor: "#2563eb",
    secondaryColor: "#f1f5f9",
    description: "Clean business template with blue accents",
  },
  {
    id: "green",
    name: "Academic Green",
    primaryColor: "#059669",
    secondaryColor: "#ffffff",
    description: "Minimalist white template with green accents",
  },
  {
    id: "red",
    name: "Corporate Red",
    primaryColor: "#dc2626",
    secondaryColor: "#f3f4f6",
    description: "Professional red corporate styling",
  },
  {
    id: "dark",
    name: "Modern Dark",
    primaryColor: "#1f2937",
    secondaryColor: "#f59e0b",
    description: "Contemporary dark theme with gold highlights",
  },
];

// Get template by id, or fallback to default if not found
export function getTemplateById(templateId: string): Template {
  const template = templates.find((t) => t.id === templateId);
  return template || templates[0];
}

// Example function to get primary color for a template, can expand for fonts etc.
export function getPrimaryColor(templateId: string): string {
  return getTemplateById(templateId).primaryColor;
}

// Example function to get secondary color
export function getSecondaryColor(templateId: string): string {
  return getTemplateById(templateId).secondaryColor;
}

// Export all templates for dropdown / UI
export function getAllTemplates(): Template[] {
  return templates;
}
