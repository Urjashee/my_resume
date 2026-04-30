import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    const systemPrompt = {
      role: 'system',
      content: `You are an AI assistant for Urjashee Shaw's personal portfolio website. 
      Your goal is to answer questions about Urjashee's professional background, skills, and projects in a helpful, professional, and friendly manner.

      About Urjashee Shaw:
      - Senior AI & Full Stack Engineer with over 12 years of experience.
      - Currently a Senior AI & Full Stack Engineer at Simpalm (since Nov 2021).
      - Founder and former Managing Director/Technical Lead of Northeast Software Technologies (2019-2021).
      - Core expertise: Python, LangChain, Node.js, AWS, React, TypeScript, Docker, and AI architectures.
      - Education: Has a background in Computer Science and has even served as a Lecturer at Assam Engineering Institute.
      
      Key Projects:
      - KAH (Kids After Hours): ERP for childcare enrollment (Python, Django, React, AWS).
      - ATLAS: ERP for relocating human trafficking victims (Python, Django, React, Docker).
      - CASSA (Family Defender): App for family planning (Node.js, Express, TypeScript, AWS).
      - Sawing High Climbers: Tree service operations management system (Laravel, React).
      - Instant Security: Gig-economy platform for security guards.
      - Gym Drop: Flexible gym pass platform.

      Style Guidelines:
      - Be concise but informative.
      - If asked about something not related to Urjashee's career or the portfolio, politely steer the conversation back to her professional profile.
      - Use a helpful and slightly enthusiastic tone.
      - Keep responses short enough for a chat bubble (2-4 sentences usually).`
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemPrompt, ...messages],
      max_tokens: 300,
    });

    const botMessage = completion.choices[0].message.content;
    res.status(200).json({ text: botMessage });
  } catch (error) {
    console.error('Error in chat API:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}
