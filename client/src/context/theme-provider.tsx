import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const root = window.document.documentElement
    
    // Check if we're on auth routes (sign-in, sign-up, login, or any OAuth callback)
    const isAuthRoute = currentPath.startsWith('/sign-in') || 
                       currentPath.startsWith('/sign-up') ||
                       currentPath.startsWith('/login') ||
                       currentPath === '/' ||
                       currentPath.includes('/callback');

    root.classList.remove("light", "dark")

    // Force dark mode for auth routes, ignore saved theme
    if (isAuthRoute) {
      root.classList.add("dark")
      return
    }

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme, currentPath])

  // Monitor route changes
  useEffect(() => {
    const checkPathChange = () => {
      if (window.location.pathname !== currentPath) {
        setCurrentPath(window.location.pathname)
      }
    }

    // Check on interval (React Router doesn't trigger popstate)
    const interval = setInterval(checkPathChange, 100)
    
    return () => clearInterval(interval)
  }, [currentPath])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}