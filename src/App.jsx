import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider, useTheme } from "./components/ThemeProvider"
import { Navbar } from "./components/Navbar"
import { Home } from "./pages/Home"
import { GithubProjects } from "./pages/GithubProjects"
import { Chatbot } from "./components/Chatbot"
import { RetroBackground } from "./components/RetroBackground"

function AppContent() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-background font-sans antialiased relative">
      {theme === "alien" && <RetroBackground />}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
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
