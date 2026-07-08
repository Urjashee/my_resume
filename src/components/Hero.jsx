import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Download } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[520px] sm:min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ backgroundColor: 'hsl(var(--blob-1) / 0.3)' }}></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ backgroundColor: 'hsl(var(--blob-2) / 0.3)', animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ backgroundColor: 'hsl(var(--blob-3) / 0.3)', animationDelay: '4s' }}></div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >

          
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Hi, I'm <br className="sm:hidden" />
            <span className="text-gradient">Urjashee Shaw</span>
          </h1>
          
          <p className="text-2xl sm:text-3xl text-foreground/80 mb-8 font-semibold">
            Senior Full Stack & AI Engineer | Tech Lead
          </p>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            I build intelligent, scalable AI architectures and high-performance applications. 
            With 12+ years of experience, I specialize in agentic AI systems (MCP, LangGraph), LLM integrations, and robust cloud infrastructure using Python, Node.js, and AWS.
          </p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02]" style={{ boxShadow: 'var(--primary-glow)' }} asChild>
              <a href="/urjashee_shaw_resume.pdf" download="Urjashee_Shaw_Resume.pdf" className="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-white/20 hover:bg-white/10 glass" asChild>
              <a href="#projects">View Projects</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-white/20 hover:bg-white/10 glass" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
