const axios = require('axios');
require('dotenv').config();  // If you're using environment variables

const summarizeText = async (text) => {
  const apiKey = process.env.ACCESS_TOKEN;
  const url = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';  // Example Hugging Face model URL

  const response = await axios.post(
    url,
    { inputs: text },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return response.data[0].summary_text;  // Assuming the API returns a summary field
};

module.exports = summarizeText;
