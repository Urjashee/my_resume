import { motion } from "framer-motion"
import { ExternalLink, GitBranch, Code2 } from "lucide-react"

const projects = [
  {
    name: "advanced_rag",
    description: "Cyclic RAG system using LangGraph + OpenAI GPT-4o + ChromaDB — runs fully locally, no cloud needed.",
    language: "Python",
    url: "https://github.com/Urjashee/advanced_rag",
  },
  {
    name: "agentic-ai",
    description: "Jupyter Notebook implementation for agentic AI architectures.",
    language: "Jupyter Notebook",
    url: "https://github.com/Urjashee/agentic-ai",
  },
  {
    name: "airestate",
    description: "Airestate is an airbnb type property listing application.",
    language: "JavaScript",
    url: "https://github.com/Urjashee/airestate",
  },
  {
    name: "akors",
    description: "Open source Python project.",
    language: "Python",
    url: "https://github.com/Urjashee/akors"
  },
  {
    name: "atlas-free-be",
    description: "Backend services and API for the Atlas application.",
    language: "TypeScript",
    url: "https://github.com/Urjashee/atlas-free-be"
  },
  {
    name: "chat-application-open-ai",
    description: "Chat application integrated with OpenAI.",
    language: "TypeScript",
    url: "https://github.com/Urjashee/chat-application-open-ai",
  },
  {
    name: "digital-twin",
    description: "Digital twin implementation and simulation models.",
    language: "Python",
    url: "https://github.com/Urjashee/digital-twin"
  },
  {
    name: "django-pydantic",
    description: "Integration examples of Django with Pydantic for data validation.",
    language: "Python",
    url: "https://github.com/Urjashee/django-pydantic"
  },
  {
    name: "health-consultation",
    description: "AI application to consult about your health.",
    language: "TypeScript",
    url: "https://github.com/Urjashee/health-consultation",
  },
  {
    name: "instant-security-backend",
    description: "Backend codebase for the Instant Security application.",
    language: "Laravel",
    url: "https://github.com/Urjashee/instant-security-backend"
  },
  {
    name: "job-search-ai",
    description: "AI-powered job search application.",
    language: "Python",
    url: "https://github.com/Urjashee/job-search-ai",
  },
  {
    name: "langchain-python-agent",
    description: "Implementations of AI agents using LangChain and Python.",
    language: "Python",
    url: "https://github.com/Urjashee/langchain-python-agent"
  },
  {
    name: "liftingdiarycourse",
    description: "Lifting Diary course project built with modern web technologies.",
    language: "TypeScript",
    url: "https://github.com/Urjashee/liftingdiarycourse"
  }
];

export function GithubProjects() {
  return (
    <main className="pt-32 pb-20 min-h-screen">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Open Source</span> Projects
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of my open-source contributions and personal projects hosted on GitHub.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <GitBranch className="w-6 h-6" />
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                <h3 className="text-xl font-bold mb-2 relative z-10 text-white">{project.name}</h3>
                <p className="text-muted-foreground mb-6 flex-grow relative z-10">{project.description}</p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground relative z-10 mt-auto pt-4 border-t border-white/10">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span>{project.language}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
