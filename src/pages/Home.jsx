import { Hero } from "../components/Hero"
import { Experience } from "../components/Experience"
import { Projects } from "../components/Projects"
import { Contact } from "../components/Contact"
import { TerminalConsole } from "../components/TerminalConsole"

export function Home() {
  return (
    <main>
      <Hero />
      <TerminalConsole />
      <Experience />
      <Projects />
      <Contact />
    </main>
  )
}
