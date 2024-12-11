import { NextResponse } from "next/server";

export async function POST(req) {
    const { prompt } = await req.json(); // Get the prompt from the request body
    const openAiUrl = "https://api.openai.com/v1/completions";
    const openAiKey = process.env.OPENAI_API_KEY;

    // Retry mechanism to handle rate limiting
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const response = await fetch(openAiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${openAiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt, max_tokens: 100 }),
            });

            if (response.ok) {
                const data = await response.json();
                return NextResponse.json(data); // Return the OpenAI response
            } else if (response.status === 429) {
                console.warn("Rate limit hit, retrying...");
                await delay((attempt + 1) * 1000); // Exponential backoff
            } else {
                throw new Error("Unexpected error");
            }
        } catch (err) {
            console.error(err);
        }
    }

    // If the retries fail, return an error response
    return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 });
}

// Utility function for delaying retries
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
