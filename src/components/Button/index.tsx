import { ReactNode, FC } from 'react'
import { Container } from './styles'

interface Props {
  stateGame: string
  children: ReactNode
  handleStateGame(): void
}

export const Button: FC<Props> = ({ children, stateGame, handleStateGame }) => {
  const stateColor = stateGame === children

  return (
    <Container
      stateColor={stateColor}
      onClick={handleStateGame}
      value={children as string}>
      {children}
    </Container>
  )
}
