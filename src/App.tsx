import { useState, useEffect, useCallback } from 'react'
import PipePath from './components/PipePath'
import AnimatedChar from './components/AnimatedChar'
import useKeyboardInput from './hooks/useKeyboardInput'
import styles from './App.module.css'

interface AnimatingChar {
  id: string
  char: string
  timestamp: number
}

function App() {
  const [outputText, setOutputText] = useState<string[]>([])
  const [animatingChars, setAnimatingChars] = useState<AnimatingChar[]>([])
  const [pathData, setPathData] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  const updatePipePath = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const mobile = width < 768
    setIsMobile(mobile)

    if (mobile) {
      setPathData(`M 50,${height * 0.3} C 100,${height * 0.15} 250,${height * 0.45} 350,${height * 0.3} L 400,${height * 0.3}`)
    } else {
      setPathData(`M 100,${height * 0.3} C 250,${height * 0.1} 650,${height * 0.5} 800,${height * 0.3} L 900,${height * 0.3}`)
    }
  }, [])

  useEffect(() => {
    updatePipePath()
    window.addEventListener('resize', updatePipePath)
    return () => window.removeEventListener('resize', updatePipePath)
  }, [updatePipePath])

  const handleCharInput = useCallback((char: string) => {
    const newChar: AnimatingChar = {
      id: `${Date.now()}-${Math.random()}`,
      char,
      timestamp: Date.now()
    }
    setAnimatingChars(prev => [...prev, newChar])

    setTimeout(() => {
      setOutputText(prev => [...prev, char])
      setAnimatingChars(prev => prev.filter(c => c.id !== newChar.id))
    }, 1500)
  }, [])

  const handleBackspace = useCallback(() => {
    setOutputText(prev => prev.slice(0, -1))
  }, [])

  const handleEnter = useCallback(() => {
    handleCharInput('\n')
  }, [handleCharInput])

  useKeyboardInput({
    onChar: handleCharInput,
    onBackspace: handleBackspace,
    onEnter: handleEnter
  })

  const formatOutputText = () => {
    return outputText.map((char, index) => {
      if (char === '\n') {
        return <br key={index} />
      }
      return char === ' ' ? '\u00A0' : char
    })
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Typographic Pipeline</h1>
        <p className={styles.subtitle}>タイプして、文字が土管を流れるのを見てみよう</p>
      </header>

      <main className={styles.main}>
        <PipePath pathData={pathData} isMobile={isMobile} />
        
        <div className={styles.animationContainer}>
          {animatingChars.map(({ id, char }) => (
            <AnimatedChar key={id} char={char} pathData={pathData} />
          ))}
        </div>

        <div className={styles.outputContainer}>
          <div className={styles.outputText}>
            {formatOutputText()}
            <span className={styles.cursor}>|</span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App