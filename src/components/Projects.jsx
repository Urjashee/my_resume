import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const projects = [
  {
    name: "KAH (Kids After Hours)",
    link: "https://kidsafterhours.com/",
    description: "Internal ERP platform for a U.S.-based childcare provider to streamline student enrollment, scheduling, and staff coordination.",
    tech: ["Python", "Django", "React", "PostgreSQL", "AWS"]
  },
  {
    name: "ATLAS",
    link: "https://www.wayplace.org/",
    description: "In-house ERP application to manage and relocate victims of human trafficking in the U.S. market.",
    tech: ["Python", "Django", "React", "Docker", "AWS"]
  },
  {
    name: "CASSA (Family Defender)",
    link: "https://play.google.com/store/apps/details?id=com.familydefender.cassa&hl=en_GB&pli=1",
    description: "Application that assigns family plans based on survey results, connecting parents, children, and advisors.",
    tech: ["Node.js", "Express", "TypeScript", "AWS", "CI/CD"]
  },
  {
    name: "Sawing High Climbers",
    link: "https://portal.sawinghighclimbers.com/",
    description: "Developed a system for managing operations of a tree service company, including client proposals, project management,scheduling, and documentation",
    tech: ["Laravel", "ReactJs", "React Redux", "MySQL", "AWS (SES, SNS, S3)"]
  },
  {
    name: "INSTANT SECURITY",
    description: "Gig-economy platform allowing users to post short-term security jobs for guards to apply and fulfill.",
    tech: ["Node.js", "Express", "React", "TypeORM", "AWS"]
  },
  {
    name: "Gym Drop",
    link: "https://app.gymdrop.fit/login",
    description: "Platform for purchasing day passes to registered gyms, providing flexible access without long-term commitments.",
    tech: ["Laravel", "React", "PostgreSQL", "AWS"]
  }
]

export function Projects() {
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
              <Card className="glass-card flex flex-col h-full border-white/10 overflow-hidden group">
                <CardHeader>
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
                </CardHeader>
                <CardContent className="flex-1 pt-4">
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
    </section>
  )
}
