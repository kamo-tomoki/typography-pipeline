import { useEffect, useRef } from 'react'
import styles from './AnimatedChar.module.css'

interface AnimatedCharProps {
  char: string
  pathData: string
}

function AnimatedChar({ char, pathData }: AnimatedCharProps) {
  const charRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (charRef.current && pathData) {
      charRef.current.style.offsetPath = `path("${pathData}")`
    }
  }, [pathData])

  const displayChar = char === ' ' ? '\u00A0' : char

  return (
    <div ref={charRef} className={styles.animatedChar}>
      {displayChar}
    </div>
  )
}

export default AnimatedChar