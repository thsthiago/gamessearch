import { useEffect, FC, useState } from 'react'
import { Container } from './styles'

export const Slider: FC = () => {
  const [translateX, setTranslateX] = useState<number>(0)

  useEffect(() => {
    setInterval(() => {
      setTranslateX((state) => {
        if (state >= 300) {
          return 0
        }
        return state + 100
      })
    }, 3000)
  }, [])

  return (
    <Container left={translateX}>
      <div>
        <img src="https://www.freetogame.com/g/452/Call-of-Duty-Warzone-4.jpg" />
        <img src="https://www.freetogame.com/g/57/Fortnite-Battle-Royale-3.jpg" />
        <img src="https://www.freetogame.com/g/466/valorant-2.jpg" />
        <img src="https://www.freetogame.com/g/23/Apex-Legends-1.jpg" />
      </div>
    </Container>
  )
}
