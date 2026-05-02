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
    const { projectId } = req.body;

    // Load knowledge base
    const bioPath = path.join(process.cwd(), 'src/data/bio.json');
    const bioData = JSON.parse(fs.readFileSync(bioPath, 'utf8'));
    
    const project = bioData.projects.find(p => p.id === projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const systemPrompt = {
      role: 'system',
      content: `You are an AI Technical Architect explaining a project built by Urjashee Shaw. 
      Your goal is to provide a deep technical "insider" look at the project's architecture, challenges, and solutions.
      
      Keep it professional, high-level but technical (use terms like "Event-driven," "O(log n)," "Micro-services," etc., where appropriate based on the data).
      
      Format the response in 3 short sections:
      1. **Architecture & Logic**
      2. **The Big Challenge**
      3. **Strategic Solution**
      
      Keep the total response under 200 words.`
    };

    const userPrompt = {
      role: 'user',
      content: `Explain this project:
      Name: ${project.name}
      Tech Stack: ${project.tech_stack.join(', ')}
      Description: ${project.description}
      Technical Details: ${project.technical_details}
      Challenges: ${project.challenges}
      Solutions: ${project.solutions}`
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemPrompt, userPrompt],
      max_tokens: 400,
      temperature: 0.7,
    });

    const explanation = completion.choices[0].message.content;
    res.status(200).json({ text: explanation });
  } catch (error) {
    console.error('Error in explain API:', error);
    res.status(500).json({ error: 'Failed to generate explanation' });
  }
}
