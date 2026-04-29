import { Mail, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
)

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
)

export function Contact() {
  return (
    <section id="contact" className="container mx-auto px-4 py-32 mb-20 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="glass-card rounded-[2.5rem] p-8 sm:p-16 text-center relative overflow-hidden border-white/20 shadow-[0_0_50px_rgba(124,58,237,0.15)]">
          {/* Background glow for CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[100px] pointer-events-none rounded-full"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Let's build something <span className="text-gradient">amazing</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium">
              I'm currently open to new opportunities, including relocation to the EU/Australia (visa sponsorship required). 
              Whether you have a question or just want to say hi, my inbox is always open.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-12">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105" asChild>
                <a href="mailto:urjashee09@gmail.com" className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Me
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-white/20 hover:bg-white/10 glass transition-all hover:scale-105" asChild>
                <a href="tel:+918876946163" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Me
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6">
              <a href="https://github.com/Urjashee" target="_blank" rel="noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] group">
                <GithubIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/urjashee-shaw" target="_blank" rel="noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] group">
                <LinkedinIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
