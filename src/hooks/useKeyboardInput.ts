import { useEffect } from 'react'

interface UseKeyboardInputProps {
  onChar: (char: string) => void
  onBackspace: () => void
  onEnter: () => void
}

function useKeyboardInput({ onChar, onBackspace, onEnter }: UseKeyboardInputProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return
      }

      if (e.key === 'Backspace') {
        e.preventDefault()
        onBackspace()
      } else if (e.key === 'Enter') {
        e.preventDefault()
        onEnter()
      } else if (e.key === ' ') {
        e.preventDefault()
        onChar(' ')
      } else if (e.key.length === 1) {
        e.preventDefault()
        onChar(e.key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onChar, onBackspace, onEnter])
}

export default useKeyboardInput