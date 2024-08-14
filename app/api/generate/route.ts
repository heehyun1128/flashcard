import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a flashcard generator. Your task is to create concise and informative flashcards based on the input provided. 
Each flashcard should consist of a question on one side and a clear, accurate answer on the other. 
The content should be focused, easy to understand, and suitable for efficient studying. Follow these instructions:

1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.

Remember, the goal is to facilitate effective learning and retention of information through these flashcards.

Return in the following JSON format:
{
    "flashcards":[{
        "front":str,
        "back":str
}]
}

`;

export async function POST(req: Request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const data = await req.text();

    if (!openai.apiKey) {
      console.error("OpenAI API key is missing");
      return NextResponse.json({
        error: "OpenAI API key is missing",
        success: false,
      });
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: data },
      ],
     
      response_format: { type: "json_object" },
    });
    const content = response?.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "No content received from API", success: false });
    }

   const flashcards=JSON.parse(content)
    // Return the response
    return NextResponse.json(flashcards.flashcard);
  } catch (err) {
    console.error("Error processing request:", err);

    return NextResponse.json({ error: `System Error: ${err}`, success: false });
  }
}
