import { useCallback, useContext, useState, createContext, FC } from 'react'

export interface CardProps {
  id: number
  title: string
  thumbnail: string
  short_description: string
  genre: string
  platform: string
  interesse: string
  estrelas: number
  favorito: boolean
}

interface FilterProps {
  search: string
  ordem: string
  interesses: string
  generos: Array<string>
}

interface ContextData {
  filter: FilterProps
  newFilters(filters: FilterProps): void
}

const GameContext = createContext({} as ContextData)

const GameProvider: FC = ({ children }) => {
  const [filter, setFilters] = useState({
    search: '',
    ordem: '',
    generos: [],
    interesses: ''
  } as FilterProps)

  const newFilters = useCallback(
    (filters: FilterProps) => {
      setFilters(filters)
    },
    [setFilters]
  )

  return (
    <GameContext.Provider value={{ newFilters, filter }}>
      {children}
    </GameContext.Provider>
  )
}

const useGames = () => {
  const context = useContext(GameContext)

  return context
}

export { GameProvider, useGames }
