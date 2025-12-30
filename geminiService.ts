
import { GoogleGenAI, Type } from "@google/genai";
import { KingdomData } from "./types";

/**
 * Helper para inicializar a API do Gemini
 */
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generateRandomEvent(kingdom: KingdomData) {
  const prompt = `Você é um mestre de RPG gerando eventos para o sistema Kingmaker. 
  O reino chama-se "${kingdom.stats.name}", nível ${kingdom.stats.level}. 
  Status de Ruínas: Corrupção(${kingdom.stats.ruins.corruption.value}), Crime(${kingdom.stats.ruins.crime.value}), Decadência(${kingdom.stats.ruins.decay.value}), Conflito(${kingdom.stats.ruins.strife.value}).
  
  Gere um evento aleatório que desafie o reino de forma criativa.`;

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Nome criativo do evento" },
            level: { type: Type.NUMBER, description: "Nível sugerido para o evento" },
            skill: { type: Type.STRING, description: "Perícia recomendada (ex: Diplomacia, Artes Bélicas)" },
            dc: { type: Type.NUMBER, description: "Dificuldade do teste (14-40)" },
            notes: { type: Type.STRING, description: "Descrição das consequências e narrativa" },
          },
          required: ["name", "level", "skill", "dc", "notes"]
        }
      }
    });

    const jsonStr = response.text.trim();
    return jsonStr ? JSON.parse(jsonStr) : null;
  } catch (error) {
    console.error("Erro no Gemini (Eventos):", error);
    return null;
  }
}
