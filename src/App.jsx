import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import { Navbar } from "./components/Navbar"
import { Home } from "./pages/Home"
import { GithubProjects } from "./pages/GithubProjects"
import { Chatbot } from "./components/Chatbot"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/open-source" element={<GithubProjects />} />
          </Routes>
          <Chatbot />
          <footer className="py-6 text-center text-sm text-muted-foreground border-t border-white/10">
            © {new Date().getFullYear()} Urjashee Shaw. All rights reserved.
          </footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
