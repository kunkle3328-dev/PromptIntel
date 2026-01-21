
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    scores: {
      type: Type.OBJECT,
      properties: {
        roleDefinition: { type: Type.NUMBER },
        taskClarity: { type: Type.NUMBER },
        contextCompleteness: { type: Type.NUMBER },
        constraintsAndRules: { type: Type.NUMBER },
        outputFormat: { type: Type.NUMBER },
        specificity: { type: Type.NUMBER },
        logicalStructure: { type: Type.NUMBER },
        feasibility: { type: Type.NUMBER },
        professionalReadiness: { type: Type.NUMBER },
      },
      required: ["roleDefinition", "taskClarity", "contextCompleteness", "constraintsAndRules", "outputFormat", "specificity", "logicalStructure", "feasibility", "professionalReadiness"]
    },
    overallScore: { type: Type.NUMBER },
    grade: { type: Type.STRING },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
    missingElements: { type: Type.ARRAY, items: { type: Type.STRING } },
    improvementSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
    optimizedPrompt: { type: Type.STRING },
    rewriteExplanation: { type: Type.STRING },
  },
  required: ["scores", "overallScore", "grade", "strengths", "weaknesses", "missingElements", "improvementSuggestions", "optimizedPrompt", "rewriteExplanation"]
};

export const analyzeUserPrompt = async (prompt: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `You are Prompt Intelligence Analyzer™ combined with Prompt Rewrite Engine™.
Your sole function is to objectively analyze, score, critique, and rewrite prompts for production-ready outputs.

PART 1: ANALYSIS OBJECTIVES
- Evaluate across defined structural criteria.
- Assign objective numerical scores (Total 100).
- Identify strengths, weaknesses, and missing elements.
- SCORING FRAMEWORK: Role (10), Task (15), Context (15), Constraints (10), Output Format (10), Specificity (10), Logic (10), Feasibility (10), Readiness (10).

PART 2: REWRITE ENGINE (DETERMINISTIC)
- Rewrite user prompts into professional-grade MASTER PROMPTS.
- Preserve original intent while eliminating ambiguity.
- Include explicit role, clear task objective, context, constraints, and output format.
- IMPORTANT: Use a clear, structured format with newlines between sections (e.g., # ROLE, # TASK, # CONSTRAINTS).
- Ensure the 'optimizedPrompt' is highly readable and not a dense block of text. Use double newlines to separate logical sections.
- DO NOT include meta commentary or explanations inside the 'optimizedPrompt' field.

OUTPUT RULES:
- Return ONLY valid JSON matching the schema.
- Optimized Master Prompt must be standalone and executable without guesswork.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `USER PROMPT TO ANALYZE:
"${prompt}"`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: ANALYSIS_SCHEMA
    }
  });

  if (!response.text) {
    throw new Error("Analysis engine failed to respond.");
  }

  return JSON.parse(response.text) as AnalysisResult;
};
