import { google } from "@ai-sdk/google";
import { generateText, generateObject } from "ai";
import { z } from "zod";

const model = google("gemini-2.0-flash");

export async function analyzeIncident(title: string, description: string) {
  const { object } = await generateObject({
    model,
    schema: z.object({
      severity: z.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW"]),
      confidence: z.number().min(0).max(1),
      rootCause: z.string(),
      suggestions: z.array(z.string()),
    }),
    prompt: `Analyze the following technical incident and provide insights:
    Title: ${title}
    Description: ${description}
    
    Determine the severity based on potential business impact and technical urgency.
    Suggest 3-5 step-by-step resolution actions.
    Estimate the root cause based on common architectural patterns.`,
  });

  return object;
}
