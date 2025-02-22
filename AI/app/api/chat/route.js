import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { prompt } = await req.json(); // Extract the prompt from the request body

        // Make a POST request to the Hack Club API
        const response = await fetch('https://ai.hackclub.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'user',
                        content: prompt, // Pass the prompt as user content
                    },
                ],
            }),
        });

        // Parse the response from Hack Club API
        const data = await response.json();

        // Return only the message content
        return NextResponse.json(data.choices[0].message.content);
    } catch (error) {
        console.error('Error during Hack Club API request:', error);

        // Return an error response if something goes wrong
        return NextResponse.json(
            { error: 'An error occurred while processing your request.' },
            { status: 500 }
        );
    }
}