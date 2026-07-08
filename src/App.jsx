import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider, useTheme } from "./components/ThemeProvider"
import { Navbar } from "./components/Navbar"
import { Home } from "./pages/Home"
import { GithubProjects } from "./pages/GithubProjects"
import { Chatbot } from "./components/Chatbot"
import { RetroBackground } from "./components/RetroBackground"
import { RetroBootSequence } from "./components/RetroBootSequence"
import { RetroUfo } from "./components/RetroUfo"
import { playHover, playClick } from "./lib/sounds"

function AppContent() {
  const { theme, triggerUfo, soundMuted } = useTheme()
  const [hasBooted, setHasBooted] = useState(
    () => typeof window !== "undefined" && !!sessionStorage.getItem("retro-booted")
  )

  const showBoot = theme === "alien" && !hasBooted

  // Konami Code sequence listener
  useEffect(() => {
    if (theme !== "alien") return

    const konamiCode = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a"
    ]
    let konamiIndex = 0

    const handleKeyDown = (e) => {
      const key = e.key
      const requiredKey = konamiCode[konamiIndex]

      if (key.toLowerCase() === requiredKey.toLowerCase()) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          triggerUfo(true)
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [theme, triggerUfo])

  // Global sound blip hover/click events listener
  useEffect(() => {
    if (theme !== "alien" || soundMuted) return

    const handleHover = (e) => {
      const target = e.target.closest("button, a, input, select, textarea, [role='button']")
      if (target) {
        playHover(soundMuted)
      }
    }

    const handleClick = (e) => {
      const target = e.target.closest("button, a, [role='button']")
      if (target) {
        playClick(soundMuted)
      }
    }

    window.addEventListener("mouseover", handleHover)
    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("mouseover", handleHover)
      window.removeEventListener("click", handleClick)
    }
  }, [theme, soundMuted])

  return (
    <div className="min-h-screen bg-background font-sans antialiased relative">
      {showBoot && (
        <RetroBootSequence 
          onComplete={() => {
            sessionStorage.setItem("retro-booted", "true")
            setHasBooted(true)
          }} 
        />
      )}
      {theme === "alien" && <RetroBackground />}
      {theme === "alien" && <RetroUfo />}
      <Navbar />
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/open-source" element={<GithubProjects />} />
          </Routes>
        </main>
        <Chatbot />
        <footer className="py-6 text-center text-sm text-muted-foreground border-t border-white/10">
          © {new Date().getFullYear()} Urjashee Shaw. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="alien" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
