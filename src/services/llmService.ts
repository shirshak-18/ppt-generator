export interface LLMConfig {
  provider: string;
  apiKey: string;
  guidance?: string;
}

export interface EnhancedSlideContent {
  title: string;
  content: string[];
  type: "title" | "bullet";
  speakerNotes?: string;
}

export async function enhanceTextWithLLM(
  inputText: string,
  config: LLMConfig
): Promise<EnhancedSlideContent[]> {
    // Test mode - simulate API response
  if (config.apiKey === "test-key") {
    console.log("🧪 Test mode: Simulating LLM API call...");
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return [
      {
        title: "Enhanced Introduction",
        content: [
          "AI-generated opening point", 
          "Context-aware bullet point",
          "Structured according to guidance: " + (config.guidance || "general")
        ],
        type: "bullet",
        speakerNotes: "This slide was enhanced by AI based on your input"
      },
      {
        title: "Key Insights", 
        content: [
          "AI identified main themes",
          "Automatically structured content", 
          "Applied tone: " + (config.guidance || "professional")
        ],
        type: "bullet",
        speakerNotes: "Emphasize how AI improved the organization"
      }
    ];
  }


  const prompt = `
Parse the following text into a structured PowerPoint presentation. 
${config.guidance ? `Context: ${config.guidance}` : ""}

Rules:
- Create an appropriate number of slides (not fixed)
- Each slide should have a clear title
- Include bullet points for content
- Optionally add brief speaker notes

Input text:
${inputText}

Return ONLY a JSON array in this exact format:
[
  {
    "title": "Slide Title",
    "content": ["Bullet point 1", "Bullet point 2"],
    "type": "bullet",
    "speakerNotes": "Optional speaker notes"
  }
]
`;

  try {
    let response;
    
    if (config.provider === "openai") {
      response = await callOpenAI(prompt, config.apiKey);
    } else if (config.provider === "anthropic") {
      response = await callAnthropic(prompt, config.apiKey);
    } else {
      throw new Error(`Provider ${config.provider} not supported`);
    }

    return JSON.parse(response);
  } catch (error) {
    console.error("LLM parsing failed:", error);
    // Fallback to your existing parser
    throw error;
  }
}

async function callOpenAI(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a presentation expert. Return only valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callAnthropic(prompt: string, apiKey: string): Promise<string> {
  // Similar implementation for Claude API
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}
