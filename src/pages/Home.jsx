import { Hero } from "../components/Hero"
import { Experience } from "../components/Experience"
import { Projects } from "../components/Projects"
import { Contact } from "../components/Contact"

export function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <Projects />
      <Contact />
    </main>
  )
}
