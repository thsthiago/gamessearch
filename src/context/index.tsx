import { useCallback, useState, createContext, FC } from 'react'
import { IGames } from '@/interfaces/IGames'
import { Status } from '@/interfaces/IGameStorage'

export interface CardProps extends IGames {
  stars: number
  status?: Status
  favorite: boolean
}

export type Ordination = 'a-z' | 'avaliacao' | undefined 

export interface FilterProps {
  search: string
  order: Ordination
  status: Status
  genres: string[]
}

interface ContextData {
  filter: FilterProps
  newFilters(filters: FilterProps): void
}

const GameContext = createContext({} as ContextData)

const GameProvider: FC = ({ children }) => {
  const [filter, setFilters] = useState<FilterProps>({
    search: '',
    order: undefined,
    genres: [],
    status: undefined
  })

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

export { GameProvider, GameContext }
