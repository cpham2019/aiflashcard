import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Array Basics",
  "description": "An array is a collection of items stored at contiguous memory locations...",
  "leetcodeProblems": [
    {
      "name": "Two Sum",
      "url": "https://leetcode.com/problems/two-sum/"
    },
    {
      "name": "Best Time to Buy and Sell Stock",
      "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
    },
    {
      "name": "Maximum Subarray",
      "url": "https://leetcode.com/problems/maximum-subarray/"
    }
  ]
}];


export default async function handler(req, res) {
  try {
    // Request completion from OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `
          Generate information about atleast 10 topics related to arrays. 
          Include the name of the topic, a long explanation about that topic, 
          and at least 3 LeetCode problem links related to that topic.
          Format the response as JSON in the shape of: ${JSON.stringify(shape)}
        `
      }],
    });

    // Parse the API response
    const topics = JSON.parse(completion.choices[0].message.content);

    // Send topics as JSON response
    res.status(200).json(topics);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
}
