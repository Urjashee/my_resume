import { Moon, Sun, Orbit } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 shadow-inner pointer-events-auto">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${
          theme === "light"
            ? "bg-white/10 text-primary shadow-[0_0_10px_rgba(255,255,255,0.1)]"
            : "hover:text-primary text-muted-foreground hover:bg-white/5"
        }`}
        title="Light Mode"
      >
        <Sun className="w-4 h-4" />
        <span className="sr-only">Light Mode</span>
      </button>
      
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${
          theme === "dark"
            ? "bg-white/10 text-primary shadow-[0_0_10px_rgba(255,255,255,0.1)]"
            : "hover:text-primary text-muted-foreground hover:bg-white/5"
        }`}
        title="Dark Mode"
      >
        <Moon className="w-4 h-4" />
        <span className="sr-only">Dark Mode</span>
      </button>

      <button
        onClick={() => setTheme("alien")}
        className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${
          theme === "alien"
            ? "bg-white/10 text-primary shadow-[0_0_15px_rgba(34,197,94,0.3)]"
            : "hover:text-primary text-muted-foreground hover:bg-white/5"
        }`}
        title="Alien Mode"
      >
        <Orbit className="w-4 h-4 animate-spin-slow" />
        <span className="sr-only">Alien Mode</span>
      </button>
    </div>
  )
}
