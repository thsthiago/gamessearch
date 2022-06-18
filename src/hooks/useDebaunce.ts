import { useRef } from 'react'

interface Props {
  fn: (x: any) => void
  delay: number
}

export const useDebaunce = ({ fn, delay }: Props) => {
  const timeout = useRef<any>(null)

  const callback = (values: any) => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      fn(values)
    }, delay)
  }

  return callback
}
