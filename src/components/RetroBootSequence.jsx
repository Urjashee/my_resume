import { useEffect, useState } from "react"

const BOOT_LOGS = [
  "BOOTING RETRO_SYS v2.85...",
  "CPU: HYPER-ACCELERATED CO-PROCESSOR AT 4.77MHz... OK",
  "RAM TEST: 640KB BASE SYSTEM MEMORY... OK",
  "MOUNTING BIO-ARCHIVES (12+ YRS TECH EXP)... DETECTED",
  "LOADING AGENTIC SUBROUTINES (MCP, LANGGRAPH, RAG)... DONE",
  "ESTABLISHING HOST UPLINK (PORTFOLIO_KERNEL)... SECURE",
  "SYSTEM STATUS: ALL CORE COMPONENTS OPERATIONAL.",
  "READY. DISPATCHING GRAPHICAL PORTAL CORE..."
]

export function RetroBootSequence({ onComplete }) {
  const [logs, setLogs] = useState([])
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[index]])
        index++
      } else {
        clearInterval(timer)
        setTimeout(() => {
          setFading(true)
          setTimeout(() => {
            onComplete()
          }, 500)
        }, 600)
      }
    }, 220)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div 
      className={`fixed inset-0 bg-[#020b06] text-primary flex items-start justify-start p-6 sm:p-12 z-[99999] pointer-events-auto font-mono text-xs sm:text-sm leading-relaxed transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px]"></div>
      
      <div className="relative z-10 flex flex-col items-start text-left max-w-2xl select-none">
        {logs.map((log, idx) => (
          <div key={idx} className="mb-1 text-primary">
            <span className="text-primary/60 mr-2">&gt;</span>
            {log}
          </div>
        ))}
        {logs.length < BOOT_LOGS.length && (
          <div className="flex items-center mt-1">
            <span className="text-primary/60 mr-2">&gt;</span>
            <span className="w-2 h-4 bg-primary animate-pulse inline-block" />
          </div>
        )}
      </div>
    </div>
  )
}
