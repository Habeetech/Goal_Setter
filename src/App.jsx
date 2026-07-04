import { useEffect, useState } from 'react'
import './App.css'
import Home from './home/home.jsx'

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('theme')
    if (saved) return saved

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : ''
  })

  useEffect(() => {
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? '' : 'dark'))
  }

  return (
    <div className={`app-shell ${theme}`}>
      <Home theme={theme} toggleTheme={toggleTheme} />
    </div>
  )
}

export default App
