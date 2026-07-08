import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "./ThemeProvider"
import { playTractorBeam } from "../lib/sounds"

export function RetroUfo() {
  const { theme, ufoTriggered, triggerUfo, soundMuted } = useTheme()
  const [stage, setStage] = useState("idle") // idle, flyIn, beam, flyOut

  useEffect(() => {
    if (ufoTriggered && stage === "idle") {
      setStage("flyIn")
    }
  }, [ufoTriggered, stage])

  useEffect(() => {
    if (stage === "flyIn") {
      const timer = setTimeout(() => {
        setStage("beam")
        playTractorBeam(soundMuted)
      }, 1500)
      return () => clearTimeout(timer)
    }

    if (stage === "beam") {
      // Find the name header on page
      const heading = document.querySelector(".text-gradient")
      if (heading) {
        heading.style.transition = "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1.2s"
        heading.style.transform = "translateY(-180px) scale(0.05)"
        heading.style.opacity = "0"
      }

      const timer = setTimeout(() => {
        setStage("flyOut")
      }, 1800)
      return () => clearTimeout(timer)
    }

    if (stage === "flyOut") {
      const timer = setTimeout(() => {
        setStage("idle")
        triggerUfo(false)

        const heading = document.querySelector(".text-gradient")
        if (heading) {
          heading.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s"
          heading.style.transform = "translateY(0) scale(1)"
          heading.style.opacity = "1"
        }
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [stage, triggerUfo, soundMuted])

  if (theme !== "alien" || stage === "idle") return null

  const ufoVariants = {
    flyIn: {
      x: "-50vw",
      y: "12vh",
      left: "50%",
      transition: { duration: 1.5, ease: "easeOut" }
    },
    center: {
      x: "-50%",
      y: "12vh",
      left: "50%",
    },
    flyOut: {
      x: "100vw",
      y: "5vh",
      left: "50%",
      transition: { duration: 1.5, ease: "easeIn" }
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      <motion.div
        initial={{ x: "-100vw", y: "12vh", left: "50%" }}
        animate={
          stage === "flyIn"
            ? ufoVariants.flyIn
            : stage === "beam"
            ? ufoVariants.center
            : ufoVariants.flyOut
        }
        className="absolute w-24 h-16"
        style={{ translateX: "-50%" }}
      >
        <svg viewBox="0 0 100 60" className="w-full h-full text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">
          {/* Dome */}
          <path d="M 30,30 Q 50,5 70,30" fill="rgba(34, 197, 94, 0.35)" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="20" r="3" fill="currentColor" className="animate-pulse" />
          
          {/* Disc */}
          <ellipse cx="50" cy="35" rx="42" ry="11" fill="#020b06" stroke="currentColor" strokeWidth="2" />
          
          {/* Signal lamps */}
          <circle cx="22" cy="35" r="1.5" fill="currentColor" />
          <circle cx="36" cy="38" r="1.5" fill="currentColor" />
          <circle cx="50" cy="39" r="2.5" fill="currentColor" className="animate-ping" style={{ animationDuration: '0.8s' }} />
          <circle cx="64" cy="38" r="1.5" fill="currentColor" />
          <circle cx="78" cy="35" r="1.5" fill="currentColor" />
        </svg>

        {/* Abduction Light Cone */}
        <AnimatePresence>
          {stage === "beam" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "75vh" }}
              exit={{ opacity: 0 }}
              className="absolute top-[42px] left-1/2 w-32 bg-gradient-to-b from-primary/35 via-primary/10 to-transparent"
              style={{
                translateX: "-50%",
                clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
                filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.4))"
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
