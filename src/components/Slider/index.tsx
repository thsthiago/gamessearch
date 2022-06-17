import { useEffect, FC, useState } from 'react'
import { Filters } from '@/components'
import { Container } from './styles'

export const Slider: FC = () => {
  const [left, setLeft] = useState<number>(0)

  const sliderTime = () => {
    const time = setInterval(() => {
      setLeft((state) => {
        if (state >= 300) {
          return 0
        }
        return state + 100
      })
    }, 4000)

    return time
  }

  useEffect(() => {
    const time = sliderTime()

    return () => {
      clearInterval(time)
    }
  }, [])

  return (
    <>
      <Container left={left}>
        <div>
          <img src="https://www.freetogame.com/g/452/Call-of-Duty-Warzone-4.jpg" />
          <img src="https://www.freetogame.com/g/57/Fortnite-Battle-Royale-3.jpg" />
          <img src="https://www.freetogame.com/g/466/valorant-2.jpg" />
          <img src="https://www.freetogame.com/g/23/Apex-Legends-1.jpg" />
        </div>
      </Container>
      <Filters />
    </>
  )
}
