export type Status = 'played' | 'wanting to play' | 'playing' | undefined

export interface IGameStorage {
  id?: number
  stars: number
  status?: Status
  favorite: boolean
} 