import { useEffect, useRef, useState } from "react"
import { useTheme } from "./ThemeProvider"

const BANNER = `PORTFOLIO COMPILER TERMINAL (V-SYS 1.0.8)
TYPE 'help' FOR LIST OF OPERATING COMMANDS.
`

const COMMANDS = {
  help: `AVAILABLE CORE CHANNELS:
  help      - Display this list of options
  about     - Query professional engineer bio
  skills    - List core programming competencies
  projects  - Print list of notable software builds
  contact   - Query secure communication lines
  secret    - Access classified deep-space intelligence
  clear     - Purge terminal display logs`,

  about: `URJASHEE SHAW - Senior AI & Full Stack Engineer | Tech Lead
  12+ years of experience architecting intelligent backend microservices, Agentic AI systems (MCP, LangGraph), and cloud-native applications.
  Specialist in Python, React, Node.js, and scalable cloud structures.`,

  skills: `+------------------------------------------------------+
| CATEGORY         | COMPETENCIES                      |
+------------------------------------------------------+
| AI/Agentic       | MCP, LangGraph, LLM, RAG, Python  |
| Languages        | Python, Node.js, TypeScript, Go   |
| Frameworks       | React, Next.js, Django, Laravel   |
| Infrastructure   | AWS, Docker, Kubernetes, CI/CD    |
+------------------------------------------------------+`,

  projects: `NOTABLE SYSTEMS ONLINE:
  1. Stock Research Copilot (LangGraph + FastAPI)
  2. Compliance Policy Assistant (LangGraph + OpenAI)
  3. Job Intelligence MCP & RAG Engine (React 19 + Qdrant)
  4. Kids After Hours Childcare ERP (Python + React + AWS)
  5. Wayplace ATLAS Anti-Trafficking ERP (Django + Docker)`,

  contact: `SECURE COMMUNICATIONS ENCRYPTED:
  Email:    shaw.urjashee@gmail.com
  LinkedIn: linkedin.com/in/urjashee-shaw
  GitHub:   github.com/Urjashee
  Web:      www.urjasheeshaw.com`,

  secret: `[CLASSIFIED ALIEN INTEL LEVEL 4]
       .---.
      /     \\
     |  o o  |   <-- ALIEN VISITOR
      \\  -  /
       '---'
         |
      .-" "-.
     /       \\
    =========@===   <-- UFO DISCOID CORE
     \\       /
      '-----'
       \\   /
        \\ /
       /   \\        <-- TRACTOR ABDUCTION BEAM
      /     \\
     /  (o)  \\
    /   (W)   \\     <-- COW DETECTED
   /           \\
  /             \\`
}

export function TerminalConsole() {
  const { theme, triggerUfo } = useTheme()
  const [history, setHistory] = useState([{ type: "output", text: BANNER }])
  const [inputVal, setInputVal] = useState("")
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history])

  if (theme !== "alien") return null

  const handleCommand = (e) => {
    e.preventDefault()
    const rawCmd = inputVal.trim()
    if (!rawCmd) return

    const cmd = rawCmd.toLowerCase()
    const userLine = { type: "input", text: `guest@urjashee:~$ ${rawCmd}` }

    let outputText = ""
    if (cmd === "clear") {
      setHistory([])
      setInputVal("")
      return
    } else if (cmd === "secret") {
      triggerUfo(true)
      outputText = COMMANDS.secret
    } else if (cmd in COMMANDS) {
      outputText = COMMANDS[cmd]
    } else {
      outputText = `Command not found: '${rawCmd}'. Type 'help' for options.`
    }

    const outputLine = { type: "output", text: outputText }
    setHistory(prev => [...prev, userLine, outputLine])
    setInputVal("")
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary tracking-widest uppercase">
          Developer Console
        </h2>
        
        {/* Terminal frame */}
        <div className="w-full bg-[#020b06] border border-primary/30 rounded-2xl p-4 sm:p-6 shadow-[0_0_25px_rgba(34,197,94,0.15)] relative overflow-hidden font-mono text-xs sm:text-sm text-primary select-text">
          {/* CRT scanlines overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%)] bg-[length:100%_4px] opacity-80 z-20"></div>
          
          <div ref={containerRef} className="h-[280px] overflow-y-auto pr-2 space-y-3 relative z-10 scrollbar-thin scrollbar-thumb-primary/20">
            {history.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap leading-relaxed text-left">
                {line.type === "input" ? (
                  <span className="text-primary/70">{line.text}</span>
                ) : (
                  <span>{line.text}</span>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleCommand} className="mt-4 flex items-center gap-2 border-t border-primary/20 pt-4 relative z-10">
            <span className="text-primary/60 shrink-0 select-none">guest@urjashee:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type help..."
              className="flex-1 bg-transparent border-none outline-none text-primary focus:ring-0 p-0 text-xs sm:text-sm font-mono placeholder-primary/20"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </form>
        </div>
      </div>
    </section>
  )
}
