# PPT Generator - Text to PowerPoint Converter

A web application that converts bulk text and markdown into fully formatted PowerPoint presentations with customizable templates and AI-powered enhancement.

## Features

- 📝 Convert markdown-style text to PPT slides
- 🎨 Multiple professional templates (Blue, Green, Red, Dark)
- 🤖 AI-powered slide generation with LLM integration
- 👀 Live slide preview with navigation
- 📱 Responsive web interface
- 🚀 Client-side only - no server required

## Demo

[Live Demo Link] - _(Add your hosted link here)_

## Setup & Installation

1. **Clone the repository:**

2. **Install dependencies:**

3. **Start development server:**


## Usage

### Basic Usage

1. Enter your content in markdown format:
2. Select a template style
3. Click "Generate Slides"
4. Preview your slides
5. Click "Download PPT" to get your presentation

### AI-Enhanced Generation

1. Check "Use AI for enhanced parsing"
2. Select your LLM provider (OpenAI, Anthropic, Google)
3. Enter your API key (never stored)
4. Optionally add guidance (e.g., "investor pitch deck")
5. Generate enhanced slides with AI

### Testing Without API Key

Use `test-key` as API key to see simulated AI enhancement.

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **PPT Generation:** PptxGenJS
- **LLM Integration:** OpenAI, Anthropic, Google APIs

## Project Structure

## How It Works

### Text Parsing

- Identifies lines starting with `#` as slide titles
- Lines starting with `-` or `*` become bullet points
- Creates dynamic number of slides based on content structure
- LLM integration enhances parsing for complex text

### Template Application

- Predefined templates specify colors and styling
- Modular template system allows easy extension
- Consistent theme application across all slides

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
