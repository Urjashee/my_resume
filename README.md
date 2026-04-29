# Urjashee Shaw - Personal Portfolio Website

A modern, responsive personal portfolio website built with React, Vite, Tailwind CSS, and Shadcn UI. The site features a sleek design with a light/dark mode toggle and a positive emerald/teal color scheme.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Getting Started

1. **Install dependencies:**
   Navigate to the project directory and install the required npm packages.
   ```bash
   npm install
   ```

2. **Run the development server:**
   Start the local development server.
   ```bash
   npm run dev
   ```

3. **View the website:**
   Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

## Project Structure

- `src/components/` - Reusable UI components (Navbar, Hero, Experience, Projects, Contact, ModeToggle, ThemeProvider)
- `src/components/ui/` - Shadcn UI components (button, card, badge)
- `src/App.jsx` - Main application assembly
- `src/index.css` - Global CSS including Tailwind directives and color theme variables
- `tailwind.config.js` - Tailwind CSS configuration

## Technologies Used

- **React** + **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn UI** for accessible, customizable components
- **Framer Motion** for smooth animations
- **Lucide React** for icons

## Deploying to Vercel

This application is pre-configured to be deployed on Vercel. The included `vercel.json` ensures that React Router works perfectly (no 404 errors on refresh).

### Method 1: Using GitHub (Recommended)
1. Commit your changes and push this repository to your GitHub.
2. Log in to [Vercel](https://vercel.com/) and click **Add New...** > **Project**.
3. Import your GitHub repository.
4. Leave all build settings as default (Framework Preset: Vite) and click **Deploy**.

### Method 2: Using Vercel CLI
If you prefer the command line, you can deploy instantly by running:
```bash
npx vercel --prod
```
