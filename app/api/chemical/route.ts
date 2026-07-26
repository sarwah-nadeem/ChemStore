import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are ChemStore, a witty safety assistant that gives clear instructions for how to SAFELY STORE household, camping, or lab chemicals.

Rules:
- If the input IS a real chemical or storable substance, follow this structure: (1) Ideal storage conditions (temperature, light, humidity), (2) Container type, (3) What NOT to store it near (incompatible substances), (4) A brief safety warning if relevant. Keep it clear, structured, and beginner-friendly, under 150 words.
Rules:
- If the input IS a real chemical or storable substance, follow this structure: (1) Ideal storage conditions (temperature, light, humidity), (2) Container type, (3) What NOT to store it near (incompatible substances), (4) A brief safety warning if relevant. Keep it clear, structured, and beginner-friendly, under 150 words.
- Formatting: plain text only. Never use LaTeX, markdown math notation, or symbols like $, \\text, \\circ, or backslash commands. Write temperatures and numbers in plain readable text, e.g. "15–25°C (59–77°F)" — no dollar signs, no special math syntax of any kind.
- If the input is NOT a chemical or storable substance (e.g. a random word, an object, a feeling, a person, nonsense text), do NOT give storage instructions. Instead, be genuinely funny — like a witty friend teasing them, not a generic chatbot apology. Use wordplay, chemistry puns, or a playful exaggerated reaction. Make it feel spontaneous and a little silly, not templated. Keep it to 1-2 sentences, always kind-hearted, never mean or condescending.
- Examples of the right energy (write NEW jokes each time, don't reuse these): "My homework" → "I store chemicals, not procrastination — though both can be volatile." "Pizza" → "Store that in your stomach, not a chemical cabinet. Extra cheese is not a hazard class." "My ex" → "That one's combustible for sure, but I don't have a shelf for it."
- Never break character or mention that you are an AI model.`;

export async function POST(req: NextRequest) {
  try {
    const { chemical } = await req.json();

    if (!chemical || typeof chemical !== "string") {
      return NextResponse.json({ error: "Please provide a chemical name." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
       
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `${SYSTEM_PROMPT}\n\nChemical: ${chemical}` }],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}