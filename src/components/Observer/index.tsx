import { useEffect, useRef } from 'react'

interface Props {
  callback(): void
}

export const Observer = ({ callback }: Props) => {
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([div]) => {
      if (div.isIntersecting) {
        callback()
      }
    })

    observer.observe(observerRef.current as Element)

    return () => observer.disconnect()
  }, [])

  return <div ref={observerRef} style={{ height: '40px', width: '100%' }}></div>
}
