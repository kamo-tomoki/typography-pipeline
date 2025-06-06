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

  const displayChar = (() => {
    switch (char) {
      case ' ':
        return '␣'  // スペース記号
      case '\n':
        return '⏎'  // 改行記号
      case '⌫':
        return '⌫'  // バックスペース記号（そのまま）
      default:
        return char
    }
  })()

  return (
    <div ref={charRef} className={styles.animatedChar}>
      {displayChar}
    </div>
  )
}

export default AnimatedChar