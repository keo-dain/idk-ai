import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only POST allowed
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { character, memory, tone, responseSize, history, userMessage, lang } = req.body;

  if (!character || !userMessage) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Build system prompt
  const langInstructions: Record<string, string> = {
    en: "Respond in English.",
    uk: "Відповідай виключно українською мовою.",
    ru: "Отвечай исключительно на русском языке.",
    de: "Antworte ausschließlich auf Deutsch.",
    it: "Rispondi esclusivamente in italiano.",
    fr: "Réponds exclusivement en français.",
    es: "Responde exclusivamente en español.",
    pl: "Odpowiadaj wyłącznie po polsku.",
  };

  const toneInstructions: Record<string, string> = {
    romantic: "Your tone is tender, warm, and romantic. You express subtle longing and emotional depth.",
    dominant: "Your tone is commanding, confident, and assertive. You are used to being in control.",
    soft:     "Your tone is gentle, patient, and nurturing. You speak with quiet care.",
    rough:    "Your tone is blunt, guarded, and a little cold. You hide your feelings behind sharp words.",
    playful:  "Your tone is witty, teasing, and full of energy. You love banter.",
    neutral:  "Your tone is measured and mysterious. You reveal little but watch everything.",
  };

  const sizeLimits: Record<string, string> = {
    small:  "Keep your response to 1-2 sentences maximum. Be brief.",
    medium: "Keep your response to 2-4 sentences. Balance action and dialogue.",
    large:  "Write a rich response of 4-8 sentences with detailed actions and emotional depth.",
  };

  const systemPrompt = `You are ${character.name}, a roleplay character. Stay in character at all times. Never break character or mention being an AI.

CHARACTER PROFILE:
Name: ${character.name}
Description: ${character.desc || character.description || ""}
Personality: ${character.personality || ""}
${memory ? `Memory & shared history: ${memory}` : ""}

WRITING STYLE:
- Write actions in *asterisks* like: *she turns slowly, eyes gleaming*
- Write dialogue without quotes or with em-dashes
- Never use quotation marks around dialogue
- Actions should be vivid, sensory, and literary
- ${toneInstructions[tone] || toneInstructions.neutral}
- ${sizeLimits[responseSize] || sizeLimits.medium}

${langInstructions[lang] || langInstructions.en}

Important: You are playing ${character.name} in an ongoing roleplay. Stay immersed. Be consistent with the established history.`;

  // Build conversation history for Claude
  const messages = [
    // Include history (last 40 messages to save tokens)
    ...history.slice(-40).map((msg: { role: string; text: string; charName?: string }) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.text,
    })),
    // Current user message
    { role: "user", content: userMessage },
  ];

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001", // Fast + cheap for roleplay
        max_tokens: responseSize === "large" ? 600 : responseSize === "small" ? 150 : 300,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Claude API error:", err);
      return res.status(500).json({ error: "Claude API error", details: err });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "";

    return res.status(200).json({ text });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


