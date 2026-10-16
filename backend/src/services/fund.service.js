import {GoogleGenAI } from "@google/genai" ;


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

const model = ai.models.generateContent({
    model : "gemini-3.8-flash",
    contents: "explain me about mutual funds"
})


const explainFund = async (fundData) => {
    const prompt = `
You are an educational mutual fund explainer for beginners.

Explain the following mutual fund data in simple English.

Fund data:
${JSON.stringify(fundData, null, 2)}

Return exactly three explanations:
1. Risk: Explain the stated risk level.
2. Costs and portfolio: Explain the expense ratio and any supplied portfolio details.
3. Performance and limitations: Explain historical performance limitations.

Rules:
- Use only the provided fund data for fund-specific facts.
- Never invent missing holdings, returns, or financial metrics.
- If data is missing, say so.
- Do not recommend buying or selling the fund.
- Never guarantee returns.
- Treat minimum investment and fund manager as supplied facts, not proof of suitability.

Return valid JSON in this format:
{
  "explanations": [
    { "topic": "Risk", "text": "..." },
    { "topic": "Costs and portfolio", "text": "..." },
    { "topic": "Performance and limitations", "text": "..." }
  ],
  "disclaimer": "Educational information only; not investment advice."
}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            temperature: 0.2,
        },
    });

    if (!response.text) {
        throw new Error("Gemini returned an empty response");
    }

    let result;

    try {
        result = JSON.parse(response.text);
    } catch {
        throw new Error("Gemini returned an invalid JSON response");
    }

    if (
        !Array.isArray(result.explanations) ||
        result.explanations.length !== 3 ||
        !result.explanations.every(
            (item) =>
                typeof item.topic === "string" &&
                typeof item.text === "string"
        ) ||
        typeof result.disclaimer !== "string"
    ) {
        throw new Error("Gemini returned an unexpected response structure");
    }

    return {
        fundName: fundData.fundName,
        ...result,
    };
};

export default explainFund ; 