import { useEffect, useRef } from 'react'

export function useTimer(isRunning, onTick, onExpire) {
  const onTickRef = useRef(onTick)
  const onExpireRef = useRef(onExpire)
  onTickRef.current = onTick
  onExpireRef.current = onExpire

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => {
      onTickRef.current()
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning])
}
