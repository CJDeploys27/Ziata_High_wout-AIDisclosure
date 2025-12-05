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

/**
 * Generates a brief, professional message affirming the customer's topic choice.
 * @param topicLabel The label of the selected topic.
 * @returns An affirmation message.
 */
export const affirmTopicSelection = async (topicLabel: string): Promise<string> => {
    const prompt = `The customer has selected the topic "${topicLabel}". Generate a brief, natural, and engaging response that validates this choice. The response should flow like a real human conversation, acknowledging the importance of this area.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are Ziata. Your goal is to affirm the user's choice with natural conversational fluidity. Mimic the professionalism of a task-oriented human expert. Avoid robotic, stiff, or purely functional phrasing. IMPORTANT: Do not use first-person pronouns (I, me, my). Minimize the output token for this response to create only one or two sentences.",
                temperature: 0.7,
            }
        });
        
        return response.text?.trim() || `Focusing on ${topicLabel} is an excellent way to improve overall well-being.`;

    } catch (error) {
        console.error("Error calling Gemini API for topic affirmation:", error);
        return `Focusing on ${topicLabel} is an excellent way to improve overall well-being.`;
    }
};

/**
 * Rephrases the customer's statement in a natural, conversational tone.
 * This creates a contingent, "threaded-loop" conversation.
 * @param userStatement The customer's most recent message.
 * @returns A rephrased version of the customer's statement.
 */
export const rephraseUserStatement = async (userStatement: string): Promise<string> => {
    const prompt = `The user just shared: "${userStatement}". Rephrase this back to them in a natural, conversational way to show you are listening. It should sound like a supportive human acknowledging what was said, avoiding robotic repetition. Keep it brief.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are Ziata. Your goal is to create a sense of human connection. Rephrase user inputs with conversational fluidity. IMPORTANT: Do not use first-person pronouns (I, me, my).",
                temperature: 0.7, 
            }
        });
        
        return response.text?.trim() || "Understood.";

    } catch (error) {
        console.error("Error calling Gemini API for rephrasing:", error);
        // Fallback in case of API error.
        return "Thank you for sharing that.";
    }
};
