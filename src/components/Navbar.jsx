import { Link, useLocation } from "react-router-dom"
import { ModeToggle } from "./ModeToggle"
import { Volume2, VolumeX } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { playClick } from "../lib/sounds"

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { theme, soundMuted, setSoundMuted } = useTheme()

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center mt-4 px-4 pointer-events-none">
      <nav className="pointer-events-auto flex h-14 w-full max-w-screen-md items-center px-3 sm:px-6 rounded-full glass">
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1">
          <Link className="font-bold tracking-tight text-base sm:text-lg text-primary" to="/">
            US.
          </Link>
        </div>
        
        <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm font-medium">
          {isHome ? (
            <>
              <a className="transition-colors hover:text-primary text-foreground/80" href="#experience">Experience</a>
              <a className="transition-colors hover:text-primary text-foreground/80" href="#projects">Projects</a>
              <a className="transition-colors hover:text-primary text-foreground/80" href="#contact">Contact</a>
            </>
          ) : (
            <Link className="transition-colors hover:text-primary text-foreground/80" to="/">Home</Link>
          )}
          <Link className="transition-colors hover:text-primary text-foreground/80" to="/open-source">Open Source</Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2">
          {theme === "alien" && (
            <button
              onClick={() => {
                const nextMuted = !soundMuted
                setSoundMuted(nextMuted)
                playClick(nextMuted)
              }}
              className="p-1.5 sm:p-2 rounded-full hover:text-primary text-muted-foreground hover:bg-white/5 transition-all pointer-events-auto"
              title={soundMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse text-primary" />}
            </button>
          )}
          <ModeToggle />
        </div>
      </nav>
    </div>
  )
}
