const axios = require('axios');

// Replace this with your actual API key
const API_KEY = "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";

if (!API_KEY) {
  console.error('Error: API_KEY environment variable is not set.');
  process.exit(1);
}

const testOpenAIAPI = async () => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Test API key functionality.',
        },
        {
          role: 'user',
          content: 'Hello, OpenAI!',
        },
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('API Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};



testOpenAIAPI();
