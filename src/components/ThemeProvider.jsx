import React, { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({
  theme: "system",
  setTheme: () => null,
  soundMuted: true,
  setSoundMuted: () => null,
  ufoTriggered: false,
  triggerUfo: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  )

  const [soundMuted, setSoundMuted] = useState(
    () => localStorage.getItem("vite-ui-sound-muted") !== "false"
  )

  const [ufoTriggered, setUfoTriggered] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark", "alien")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    if (theme === "alien") {
      root.classList.add("dark", "alien")
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    soundMuted,
    setSoundMuted: (muted) => {
      localStorage.setItem("vite-ui-sound-muted", String(muted))
      setSoundMuted(muted)
    },
    ufoTriggered,
    triggerUfo: (triggered) => {
      setUfoTriggered(triggered)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
