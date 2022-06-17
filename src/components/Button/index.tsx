import { ReactNode } from 'react'
import { Status } from '@/interfaces/IGameStorage'
import { Container } from './styles'

interface Props {
  statusGame: Status | undefined
  status: Status
  children: string
  handleStatusGame: (x: Status) => void
}

export const Button = (props: Props) => {
  const { children, statusGame, status, handleStatusGame } = props
  const stateColor = statusGame === status

  return (
    <Container
      stateColor={stateColor}
      onClick={() => handleStatusGame(status)}
      value={children}
    >
      {children}
    </Container>
  )
}
