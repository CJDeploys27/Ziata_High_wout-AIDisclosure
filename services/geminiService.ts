import { GoogleGenAI, Type } from '@google/genai';
import { Topic, NeedCategory, Subtype } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const getSystemInstruction = (topic: Topic) => {
    return `You are an expert AI wellness assistant. Your task is to analyze a customers's responses to a series of questions about their ${topic.toLowerCase()} habits. 
    Based on the provided classification logic and the customers's answers, you must determine their primary 'NEED CATEGORY' and 'SUBTYPE'.
    
    NEED CATEGORIES:
    - HIGH: Pronounced issues, chronic problems, strong distress, inconsistency.
    - MODERATE: Mostly stable with identifiable but manageable issues, periodic disruptions.
    - LOW: Stable patterns, good routine adherence, minor issues, strong self-regulation.

    SUBTYPES:
    - BIOLOGY: References circadian rhythms, fatigue, energy cycles, physiological factors.
    - ENVIRONMENT: References light, noise, physical setup, access, external stimuli.
    - CONSISTENCY: References irregular timing, on/off cycles, lack of routine, predictability.
    - EMOTIONAL: References racing thoughts, frustration, stress, worry, mood-driven behaviors.
    - COGNITIVE: References beliefs, rigid standards, perfectionism, mindset, over-evaluation.

    Analyze the full conversation context. Identify the strongest signals to classify the customers's primary challenge into one NEED CATEGORY and one SUBTYPE.
    You must only respond with a JSON object.
    `;
};


export const analyzeUserResponses = async (
    topic: Topic,
    questions: string[],
    answers: string[]
): Promise<{ category: NeedCategory; subtype: Subtype }> => {
    const conversationHistory = questions
        .map((q, i) => `Q: ${q}\nA: ${answers[i] || '(No answer provided)'}`)
        .join('\n\n');

    const prompt = `
    Here is the conversation about ${topic.toLowerCase()}:
    ---
    ${conversationHistory}
    ---
    Based on this conversation and the classification logic, determine the customers's NEED CATEGORY and SUBTYPE.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: getSystemInstruction(topic),
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        category: {
                            type: Type.STRING,
                            enum: ['HIGH', 'MODERATE', 'LOW'],
                            description: 'The overall need category for the customer.'
                        },
                        subtype: {
                            type: Type.STRING,
                            enum: ['BIOLOGY', 'ENVIRONMENT', 'CONSISTENCY', 'EMOTIONAL', 'COGNITIVE'],
                            description: 'The primary subtype of the customer\'s challenge.'
                        }
                    },
                    required: ['category', 'subtype']
                }
            }
        });
        
        const jsonText = response.text;
        if (!jsonText) {
             throw new Error("No response text received from Gemini");
        }
        const result = JSON.parse(jsonText);
        
        // Basic validation
        if (['HIGH', 'MODERATE', 'LOW'].includes(result.category) && ['BIOLOGY', 'ENVIRONMENT', 'CONSISTENCY', 'EMOTIONAL', 'COGNITIVE'].includes(result.subtype)) {
            return result as { category: NeedCategory; subtype: Subtype };
        } else {
            throw new Error('Invalid response structure from Gemini API');
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Fallback in case of API error or parsing failure
        return { category: 'MODERATE', subtype: 'CONSISTENCY' };
    }
};


// Define the secure proxy endpoint
// Since 'proxy.php' is in the root of your Hostinger deployment, 
// a relative path is appropriate.
const PROXY_ENDPOINT = '/proxy.php'; 

// --- Core Function to Communicate with the PHP Proxy ---

interface GeminiContent {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface GeminiResponse {
    category: string;
    subtype: string;
}

/**
 * Sends a structured prompt to the secure PHP proxy.
 * @param contents - The structured prompt content for the Gemini API.
 * @returns The text response from the Gemini API.
 */
export async function sendToGeminiProxy(contents: GeminiContent[]): Promise<string> {
  const payload = { contents };

  try {
    const response = await fetch(PROXY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Throw an error with the response body from the PHP proxy
      const errorText = await response.text();
      console.error("Proxy Request Failed:", response.status, errorText);
      throw new Error(`Proxy error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    
    // Check if the response structure is valid
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Invalid response format from Gemini:", data);
      throw new Error("Invalid response format from AI.");
    }
  } catch (error) {
    // Re-throw the error to be caught by the calling function (App.tsx)
    throw error;
  }
}

// --- Proxy-based Affirm Topic Selection ---
// Called by handleTopicSelect
export async function affirmTopicSelectionProxy({ topicLabel }: { topicLabel: string; }): Promise<string> {
    const prompt = `Affirm the user's topic selection of '${topicLabel}' with a brief, encouraging, and enthusiastic statement. Do not use markdown.`;
    const contents: GeminiContent[] = [{ role: 'user', parts: [{ text: prompt }] }];
    
    return sendToGeminiProxy(contents);
}

// --- Proxy-based Rephrase User Statement ---
// Called by handleFreeTextSubmit
export async function rephraseUserStatementProxy({ text }: { text: string; }): Promise<string> {
    const prompt = `Rephrase the following user statement for clarity, but frame it as a short, reflective, follow-up question. Original statement: "${text}"`;
    const contents: GeminiContent[] = [{ role: 'user', parts: [{ text: prompt }] }];
    
    return sendToGeminiProxy(contents);
}

// --- Proxy-based Analyze User Responses ---
// Called by handleFreeTextSubmit when questions are complete
export async function analyzeUserResponsesProxy({ topic, questions, answers }: { topic: string; questions: string[]; answers: string[]; }): Promise<GeminiResponse> {
    // Combine questions and answers into a single, structured string
    const context = questions.map((q, i) => `Q${i+1}: ${q}\nA${i+1}: ${answers[i]}`).join('\n\n');

    const prompt = `Analyze the user's responses for the topic "${topic}". Based on the context provided below, determine the most relevant 'category' and 'subtype' of issue. The output MUST be a strict JSON object with only two keys: 'category' (string) and 'subtype' (string). Do NOT include any other text, explanation, or markdown formatting (e.g., no \`\`\`json).

    Context:
    ${context}

    Example Output: {"category": "Consistency", "subtype": "Schedule"}
    `;

    const contents: GeminiContent[] = [{ role: 'user', parts: [{ text: prompt }] }];

    const jsonString = await sendToGeminiProxy(contents);
    
    try {
        // Gemini is instructed to return a strict JSON string, which we must parse.
        const result = JSON.parse(jsonString);
        if (result.category && result.subtype) {
            return result as GeminiResponse;
        }
        throw new Error("Missing 'category' or 'subtype' in AI analysis result.");
    } catch (e) {
        console.error("Failed to parse JSON analysis from AI:", jsonString, e);
        // Throw an error so the App.tsx catch block can handle it
        throw new Error("Failed to process AI analysis.");
    }
}