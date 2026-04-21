import { useCallback, useRef, useState } from 'react'

type AgentVideoWithOverlayProps = {
  src: string
  ariaLabel: string
  className?: string
}

export function AgentVideoWithOverlay({
  src,
  ariaLabel,
  className = '',
}: AgentVideoWithOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showPlayOverlay, setShowPlayOverlay] = useState(true)

  const handleClick = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      if (v.ended) v.currentTime = 0
      void v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [])

  return (
    <div className={`relative w-full cursor-pointer ${className}`.trim()} onClick={handleClick}>
      <video
        ref={videoRef}
        src={encodeURI(src)}
        className="pointer-events-none w-full max-w-full rounded-lg object-contain"
        playsInline
        onPlay={() => setShowPlayOverlay(false)}
        onPause={() => setShowPlayOverlay(true)}
        onEnded={() => setShowPlayOverlay(true)}
        aria-label={ariaLabel}
      />
      {showPlayOverlay ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg"
          aria-hidden
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 sm:h-[4.5rem] sm:w-[4.5rem]">
            <svg
              viewBox="0 0 24 24"
              className="ml-0.5 h-8 w-8 text-white"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      ) : null}
    </div>
  )
}
