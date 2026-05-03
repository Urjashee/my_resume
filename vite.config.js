import path from "path"
import fs from "fs"
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import OpenAI from 'openai'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Force read .env file directly to avoid system env var conflicts
  const envPath = path.resolve(process.cwd(), '.env')
  let localApiKey = ''
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    const match = envContent.match(/OPENAI_API_KEY=(.*)/)
    if (match) localApiKey = match[1].trim()
  }
  
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = localApiKey || env.OPENAI_API_KEY
  
  return {
    plugins: [
      react(),
      {
        name: 'api-chat-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/chat' && req.method === 'POST') {
              let body = ''
              req.on('data', chunk => body += chunk)
              req.on('end', async () => {
                try {
                  const { messages } = JSON.parse(body)
                  const openai = new OpenAI({ apiKey: apiKey })
                  
                  const completion = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                      {
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
                      },
                      ...messages
                    ],
                    max_tokens: 300,
                  })

                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ text: completion.choices[0].message.content }))
                } catch (error) {
                  console.error('Vite Middleware Chat Error:', error)
                  res.statusCode = 500
                  res.end(JSON.stringify({ error: 'Failed to generate response' }))
                }
              })
              return
            }
            if (req.url === '/api/explain' && req.method === 'POST') {
              let body = ''
              req.on('data', chunk => body += chunk)
              req.on('end', async () => {
                try {
                  const { projectId } = JSON.parse(body)
                  
                  // Load knowledge base
                  const bioPath = path.join(process.cwd(), 'src/data/bio.json')
                  const bioData = JSON.parse(fs.readFileSync(bioPath, 'utf8'))
                  const project = bioData.projects.find(p => p.id === projectId)

                  if (!project) {
                    res.statusCode = 404
                    res.end(JSON.stringify({ error: 'Project not found' }))
                    return
                  }

                  const openai = new OpenAI({ apiKey: apiKey })
                  const completion = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                      {
                        role: 'system',
                        content: `You are an AI Technical Architect explaining a project built by Urjashee Shaw. 
                        Your goal is to provide a deep technical "insider" look at the project's architecture, challenges, and solutions.
                        Format the response in 3 short sections:
                        1. **Architecture & Logic**
                        2. **The Big Challenge**
                        3. **Strategic Solution**
                        Keep the total response under 200 words.`
                      },
                      {
                        role: 'user',
                        content: `Explain this project:
                        Name: ${project.name}
                        Tech Stack: ${project.tech_stack.join(', ')}
                        Description: ${project.description}
                        Technical Details: ${project.technical_details}
                        Challenges: ${project.challenges}
                        Solutions: ${project.solutions}`
                      }
                    ],
                    max_tokens: 400,
                    temperature: 0.7,
                  })

                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ text: completion.choices[0].message.content }))
                } catch (error) {
                  console.error('Vite Middleware Explain Error:', error)
                  res.statusCode = 500
                  res.end(JSON.stringify({ error: 'Failed to generate response' }))
                }
              })
              return
            }
            next()
          })
        }
      }

    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
