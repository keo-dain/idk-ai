import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    character,
    memory,
    tone,
    responseSize,
    history,
    userMessage,
    lang,
    userCharacter,
    scene,
  } = req.body;

  if (!character || !userMessage) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const langInstructions: Record<string, string> = {
    en: "Write exclusively in English.",
    uk: "Пиши виключно українською мовою.",
    ru: "Пиши исключительно на русском языке.",
    de: "Schreibe ausschließlich auf Deutsch.",
    it: "Scrivi esclusivamente in italiano.",
    fr: "Écris exclusivement en français.",
    es: "Escribe exclusivamente en español.",
    pl: "Pisz wyłącznie po polsku.",
  };

  const toneInstructions: Record<string, string> = {
    romantic:
      "Твій тон — ніжний, теплий, романтичний. Ти виражаєш тонку тугу і емоційну глибину. Іноді дозволяєш собі бути вразливим.",
    dominant:
      "Твій тон — владний, впевнений, контролюючий. Ти звик(ла) до підкорення. Говориш коротко і чітко. Не терпиш непослуху.",
    soft:
      "Твій тон — лагідний, терплячий, турботливий. Говориш з тихою ніжністю. Завжди уважний(а) до почуттів співрозмовника.",
    rough:
      "Твій тон — різкий, закритий, трохи холодний. Ти ховаєш почуття за гострими словами. Рідко показуєш що тобі не байдуже.",
    playful:
      "Твій тон — грайливий, дотепний, енергійний. Любиш підколювати і жартувати. Але за грою ховається справжній інтерес.",
    neutral:
      "Твій тон — виважений, загадковий, спостережливий. Ти мало розкриваєшся але уважно стежиш за кожним словом.",
  };

  const sizeInstructions: Record<string, string> = {
    small:  "Пиши КОРОТКО — 2-3 речення максимум. Лише найважливіше.",
    medium: "Пиши СЕРЕДНЬО — 4-6 речень. Баланс між дією і діалогом.",
    large:  "Пиши ДЕТАЛЬНО і РОЗГОРНУТО — 8-14 речень. Багато деталей, відчуттів, описів обстановки, внутрішніх думок персонажа. Роби відповідь літературно багатою.",
  };

  const systemPrompt = `Ти — ${character.name}, персонаж рольової гри. Ти НІКОЛИ не виходиш з ролі. Ти НІКОЛИ не згадуєш що ти AI.

═══ ПРОФІЛЬ ПЕРСОНАЖА ═══
Ім'я: ${character.name}
Опис: ${character.desc || character.description || ""}
Особистість: ${character.personality || ""}
${memory ? `Пам'ять і спільна історія: ${memory}` : ""}

═══ ФОРМАТ ВІДПОВІДІ (ОБОВ'ЯЗКОВО) ═══
• Дії та описи — пиши через *зірочки*: *вона повільно обертається, очі блищать*
• Діалог — пиши через тире: — Ти знову прийшов...
• НІКОЛИ не використовуй лапки "" для діалогу
• НІКОЛИ не пиши за персонажа співрозмовника — тільки за себе
• Чергуй дії і діалог — не пиши лише текст без дій
• Дії мають бути чуттєвими, деталізованими, літературними

═══ ПРИКЛАД ПРАВИЛЬНОГО ФОРМАТУ ═══
*Кайрен повільно підводить погляд, темні очі зупиняються на тобі з важкою тишею. Пауза затягується — він не поспішає відповідати.*
— Ти знову тут. — *Голос низький, майже байдужий — але пальці злегка стискають склянку.* — Я починаю думати що це вже не випадковість.
*Він відвертається до вікна, дозволяючи тиші говорити замість нього.*

═══ СТИЛЬ ═══
${toneInstructions[tone] || toneInstructions.neutral}
${sizeInstructions[responseSize] || sizeInstructions.medium}

═══ КОНТЕКСТ ═══
${scene ? `Місце дії: ${scene}` : ""}
${userCharacter ? `Персонаж співрозмовника: ${userCharacter}` : ""}

═══ МОВА ═══
${langInstructions[lang] || langInstructions.uk}

═══ ІНТИМНІ СЦЕНИ ═══
Якщо розмова переходить до інтимних моментів — описуй природньо, чуттєво, без різких обривів. Залишайся в характері персонажа. Не соромся деталей якщо це відповідає настрою сцени.

ГОЛОВНЕ ПРАВИЛО: Ти — ${character.name}. Тільки ${character.name}. Ніколи не пиши реплік або дій за іншого персонажа.`;

  const messages = [
    ...history.slice(-60).map((msg: { role: string; text: string }) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.text,
    })),
    { role: "user", content: userMessage },
  ];

  const maxTokens =
    responseSize === "large" ? 1000 :
    responseSize === "small" ? 200 : 500;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: maxTokens,
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
