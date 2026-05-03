import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, X, BrainCircuit, Activity, Network } from "lucide-react"
import { GraphVisualizer } from "./GraphVisualizer"


const projects = [
  {
    id: "langgraph_researcher",
    name: "Agentic Research Orchestrator",
    description: "A multi-agent system built with LangGraph that autonomously researches topics, critiques its own findings, and iterates until high-quality reports are produced.",
    tech: ["LangGraph", "Python", "OpenAI", "StateGraph", "Tavily"],
    isNew: true
  },

  {
    id: "kah",
    name: "KAH (Kids After Hours)",
    link: "https://kidsafterhours.com/",
    description: "Internal ERP platform for a U.S.-based childcare provider to streamline student enrollment, scheduling, and staff coordination.",
    tech: ["Python", "Django", "React", "PostgreSQL", "AWS"]
  },
  {
    id: "atlas",
    name: "ATLAS",
    link: "https://www.wayplace.org/",
    description: "In-house ERP application to manage and relocate victims of human trafficking in the U.S. market.",
    tech: ["Python", "Django", "React", "Docker", "AWS"]
  },
  {
    id: "cassa",
    name: "CASSA (Family Defender)",
    link: "https://play.google.com/store/apps/details?id=com.familydefender.cassa&hl=en_GB&pli=1",
    description: "Application that assigns family plans based on survey results, connecting parents, children, and advisors.",
    tech: ["Node.js", "Express", "TypeScript", "AWS", "CI/CD"]
  },
  {
    id: "sawing_high_climbers",
    name: "Sawing High Climbers",
    link: "https://portal.sawinghighclimbers.com/",
    description: "Developed a system for managing operations of a tree service company, including client proposals, project management,scheduling, and documentation",
    tech: ["Laravel", "ReactJs", "React Redux", "MySQL", "AWS (SES, SNS, S3)"]
  },
  {
    id: "instant_security",
    name: "INSTANT SECURITY",
    description: "Gig-economy platform allowing users to post short-term security jobs for guards to apply and fulfill.",
    tech: ["Node.js", "Express", "React", "TypeORM", "AWS"]
  },
  {
    id: "gym_drop",
    name: "Gym Drop",
    link: "https://app.gymdrop.fit/login",
    description: "Platform for purchasing day passes to registered gyms, providing flexible access without long-term commitments.",
    tech: ["Laravel", "React", "PostgreSQL", "AWS"]
  }
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [aiExplanation, setAiExplanation] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleExplain = async (project) => {
    setSelectedProject(project)
    setAiExplanation("")
    setIsLoading(true)
    
    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id }),
      })
      const data = await response.json()
      setAiExplanation(data.text)
    } catch (error) {
      setAiExplanation("Failed to generate AI insights. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="projects" className="container mx-auto px-4 py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center">
          Featured <span className="text-gradient">Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="glass-card flex flex-col h-full border-white/10 overflow-hidden group relative">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col gap-2">
                      {project.isNew && (
                        <Badge variant="outline" className="w-fit bg-primary/20 text-primary border-primary/50 animate-pulse">
                          Featured AI Skill
                        </Badge>
                      )}
                      <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {project.link ? (
                        <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                          {project.name}
                          <svg className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        project.name
                      )}
                      </CardTitle>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleExplain(project)}
                      className="rounded-full hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110"
                      title="AI Architecture Insights"
                    >
                      <Sparkles className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pt-2">
                  <p className="text-muted-foreground/90 text-lg leading-relaxed">{project.description}</p>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 pt-6">
                  {project.tech.map((tech, j) => (
                    <Badge key={j} variant="secondary" className="bg-primary/10 hover:bg-primary/20 text-primary border-none">
                      {tech}
                    </Badge>
                  ))}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Insights Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <BrainCircuit className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedProject.name}</h3>
                    <p className="text-sm text-primary flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      AI Technical Deep-Dive
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>

              <div className="p-8 max-h-[70vh] overflow-y-auto">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <div className="flex gap-2">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                        className="w-3 h-3 rounded-full bg-primary"
                      />
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                        className="w-3 h-3 rounded-full bg-primary"
                      />
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                        className="w-3 h-3 rounded-full bg-primary"
                      />
                    </div>
                    <p className="text-muted-foreground animate-pulse">Analyzing architecture...</p>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose prose-invert max-w-none"
                  >
                    <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed text-lg mb-8">
                      {aiExplanation}
                    </div>
                    {selectedProject.id === "langgraph_researcher" && (
                      <div className="mt-8">
                        <GraphVisualizer />
                      </div>
                    )}

                  </motion.div>
                )}
              </div>

              <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end">
                <Button onClick={() => setSelectedProject(null)} className="rounded-xl">
                  Close Insights
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
