// /app/server/actions/generate-questions.js

import { OpenAI } from 'openai';

export async function generateQuestions() {
  const openai = new OpenAI({ 
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
    dangerouslyAllowBrowser: true
  });

  
  const training =  "Here are some example questions:" +

                    "Questions about Economy:" +
                    "Is taxation theft or a necessary evil or a legitimate expropriation?" +
                    "Should the government interfere with the economy?"+
                    "Are central banks necessary?"+
                    "Do you lean towards Marxist, Keynesian, or Austrian school of economics?"+
                    "Should governments prioritize balanced budgets or economic stimulus during recessions?"+
                    "What is the impact of government debt on future generations?"+
                    "How effective are monetary policies in controlling inflation?"+
                    "Should minimum wage be increased to combat income inequality?"+
                    "Does free trade always benefit a nation's economy?"+

                    "Questions about Social Issues:"+
                    "Should same-sex marriage be legal?"+
                    "Should abortion be legal? If so, under what conditions?"+
                    "Should drug use be decriminalized or legalized?"+
                    "Should euthanasia be legalized?"+
                    "How important is religious freedom in a society?"


                    "Questions about Political Philosophy:"+ +
                    "To what extent should individual liberty be balanced with societal order?"+
                    "Should the government play an active role in addressing social inequalities?"+
                    "How important is it to protect minority rights?"+
                    "Should there be limits to freedom of speech? If so, what kind?"+
                    "Is a strong central government necessary for a stable society?"+

                    "Questions about Foreign Policy"+
                    "Should the country prioritize military strength or diplomacy?"+
                    "Should the country intervene in the affairs of other nations?"+
                    "Is globalization a positive or negative force?"+
                    "How important is it to maintain good relations with other countries?"+
                    "Should the country focus on domestic issues or international affairs?";


  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: training
      },
      { role: 'system', content: 'Based on these example questions generate 10 open-ended questions to determine political leaning.' }
    ],
    max_tokens: 400,
  });

  const questionsArray = response.choices[0].message.content.split('\n').filter(q => q);
  return questionsArray;
}

