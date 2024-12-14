import { NextResponse } from 'next/server';
import { CohereClientV2 } from 'cohere-ai';

// Initialize the Cohere client using the API key from environment variables
const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY, // Your API key should be stored securely in the .env file
});

export async function POST(req) {
    try {
        const { prompt } = await req.json();  // Extract the prompt from the request body
        // console.log('Request received:', prompt);

        // Make a request to the Cohere chat API
        const response = await cohere.chat({
            model: 'command-r-plus',  // Use the model you need, 'command-r-plus' is one example
            messages: [
                {
                    role: 'user',
                    content: prompt,  // The user's input (the prompt)
                },
            ],
        });

        // If the request was successful, return the response from Cohere
        return NextResponse.json(response.message.content[0].text);
    } catch (error) {
        console.error('Error during Cohere API request:', error);

        // Return an error response if something goes wrong
        return NextResponse.json(
            { error: 'An error occurred while processing your request.' },
            { status: 500 }
        );
    }
}
