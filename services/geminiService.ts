
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMarketIntelligence = async (location: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide market intelligence for home healthcare in ${location}. Focus on local hospitals, major SNFs (Skilled Nursing Facilities), and demographic trends for seniors. Return the information in a clear, formatted summary.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    return {
      text: response.text,
      sources: groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || 'Source',
        uri: chunk.web?.uri
      })).filter((s: any) => s.uri) || []
    };
  } catch (error) {
    console.error("Error fetching market intelligence:", error);
    throw error;
  }
};

export const getAIAssistantAdvice = async (leadContext: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As a home healthcare expert, advise on this lead status: "${leadContext}". How can we improve conversion or partner relations?`,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting AI advice:", error);
    return "Unable to get advice at this moment.";
  }
};
