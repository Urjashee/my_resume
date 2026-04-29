import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const experiences = [
  {
    title: "Senior AI & Full Stack Engineer",
    company: "Simpalm",
    period: "Nov 2021 – Present",
    description: "Architected AI-driven enterprise applications using Python, LangChain, and Node.js. Designed intelligent microservices and integrated LLMs on AWS infrastructure. Built high-volume REST APIs for AI agents. Led a team via code reviews, mentoring, and agile delivery.",
  },
  {
    title: "Managing Director & Technical Lead",
    company: "Northeast Software Technologies",
    period: "Nov 2019 – Oct 2021",
    description: "Founded and scaled a technology consulting company. Led a team of 10+ engineers, improving delivery timelines by 25%. Delivered end-to-end intelligent solutions integrating modern backend systems and data models.",
  },
  {
    title: "Software Developer Consultant",
    company: "Amigo Optima Software Solutions",
    period: "Sep 2018 – Oct 2019",
    description: "Developed and optimized backend systems using Laravel and Vue.js. Delivered web and mobile solutions with focus on efficient API design and system architecture.",
  },
  {
    title: "Project Manager",
    company: "Digitalant",
    period: "Jul 2016 – Jun 2018",
    description: "Managed concurrent projects with cross-functional teams. Introduced agile methodologies. Designed backend systems and integrated APIs with Android applications.",
  },
  {
    title: "Lecturer",
    company: "Assam Engineering Institute",
    period: "Aug 2013 – Jul 2015",
    description: "Taught computer science subjects, guided student projects, and mentored aspiring engineers in algorithms, systems, and software engineering principles.",
  }
]

export function Experience() {
  return (
    <section id="experience" className="container mx-auto px-4 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center">
          Professional <span className="text-gradient">Experience</span>
        </h2>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-purple-500/50 to-transparent sm:-translate-x-1/2"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  i % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(124,58,237,0.8)] transform -translate-x-[7px] sm:-translate-x-1/2 mt-6 sm:mt-0 z-10 border-2 border-background"></div>
                
                {/* Content Side */}
                <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                  i % 2 === 0 ? "sm:pl-12" : "sm:pr-12 text-left sm:text-right"
                }`}>
                  <Card className="glass-card border-white/10 hover:-translate-y-1 transition-transform duration-300">
                    <CardHeader className="pb-2">
                      <div className={`flex flex-col mb-1 ${i % 2 === 0 ? "sm:items-start" : "sm:items-end"}`}>
                        <CardTitle className="text-2xl font-bold">{exp.title}</CardTitle>
                        <CardDescription className="text-primary font-semibold text-lg mt-1">
                          {exp.company}
                        </CardDescription>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
                        {exp.period}
                      </span>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground/90 leading-relaxed text-left">
                        {exp.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
