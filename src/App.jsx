import { useEffect, useState } from 'react'
import './App.css'
import Home from './home/home.jsx'
import { goals } from './seeds/goals.js'

function App() {
 /*  const [goals, setGoals] = useState(() => {
    const goals = window.localStorage.getItem("goals");
    if (goals) return goals;

    return [];
  }) */
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('theme')
    if (saved) return saved

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : ''
  })
const goalsSeed = goals || [];
  useEffect(() => {
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? '' : 'dark'))
  }

  return (
    <div className={`app-shell ${theme}`}>
      <Home 
      theme={theme} 
      toggleTheme={toggleTheme} 
      goals={goalsSeed} 
      user={{}}
      />
    </div>
  )
}

export default App
