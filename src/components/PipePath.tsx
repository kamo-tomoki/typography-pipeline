import styles from './PipePath.module.css'

interface PipePathProps {
  pathData: string
  isMobile: boolean
}

function PipePath({ pathData, isMobile }: PipePathProps) {
  if (!pathData) return null

  const viewBoxWidth = isMobile ? 450 : 1000
  const viewBoxHeight = window.innerHeight * 0.6

  return (
    <svg
      className={styles.pipeSvg}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="pipeGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={pathData}
        className={styles.pipePath}
        filter="url(#pipeGlow)"
      />
    </svg>
  )
}

export default PipePath