import { useContext } from 'react'
import { GameContext } from '@/context'

export const useGames = () => useContext(GameContext)
