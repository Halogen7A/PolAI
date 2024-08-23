// /server/actions/calculate-leaning.js

import { OpenAI } from 'openai';

export async function calculateLeaning(responses) {
    const openai = new OpenAI({ 
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
        dangerouslyAllowBrowser: true
      });

  const prompt = `Given the following responses, determine the user's political leaning in one sentence: ${JSON.stringify(responses)}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: prompt }
    ],
    max_tokens: 150,
  });

  const result = response.choices[0].message.content.trim();
  
  return result;
}
