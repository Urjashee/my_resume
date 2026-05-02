import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    const lastUserMessage = messages[messages.length - 1].content.toLowerCase();

    // Load knowledge base
    const bioPath = path.join(process.cwd(), 'src/data/bio.json');
    const bioData = JSON.parse(fs.readFileSync(bioPath, 'utf8'));

    // Simple RAG logic: Filter knowledge base for relevant context
    // This demonstrates a lightweight retrieval mechanism
    let relevantContext = "";
    
    // Check for project-specific queries
    const relevantProjects = bioData.projects.filter(p => 
      lastUserMessage.includes(p.name.toLowerCase()) || 
      p.tech_stack.some(t => lastUserMessage.includes(t.toLowerCase())) ||
      lastUserMessage.includes(p.id) ||
      (p.technical_details && lastUserMessage.includes(p.technical_details.toLowerCase().split(' ')[0]))
    );

    if (relevantProjects.length > 0) {
      relevantContext = "\n[CONTEXT: SPECIFIC PROJECTS FOUND]\n" + relevantProjects.map(p => 
        `Project: ${p.name}
         Role: Technical Lead / Senior Engineer
         Tech: ${p.tech_stack.join(', ')}
         Challenge: ${p.challenges}
         Solution: ${p.solutions}
         Details: ${p.technical_details}`
      ).join('\n\n');
    } else {
      // General career context
      relevantContext = `\n[CONTEXT: GENERAL PROFILE]\n${bioData.personal_info.summary}
      Skills: ${bioData.skills.languages.join(', ')}, ${bioData.skills.frameworks.join(', ')}
      Infrastructure: ${bioData.skills.infrastructure.join(', ')}`;
    }

    const systemPrompt = {
      role: 'system',
      content: `You are a high-end AI assistant for Urjashee Shaw's personal portfolio. 
      You have access to a structured knowledge base about her 12+ years of experience.
      
      Current Profile Context:
      ${relevantContext}
      
      Instructions:
      - Use the provided context to answer accurately.
      - If asked about specific technologies, mention her experience with them in projects like ${bioData.projects.slice(0,2).map(p => p.name).join(' or ')}.
      - Keep responses professional, helpful, and concise (under 4 sentences).
      - If a user asks something completely unrelated to Urjashee, politely guide them back to her professional work.`
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemPrompt, ...messages],
      max_tokens: 400,
      temperature: 0.7,
    });

    const botMessage = completion.choices[0].message.content;
    res.status(200).json({ text: botMessage });
  } catch (error) {
    console.error('Error in chat API:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}
