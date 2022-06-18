import { CardProps } from '../context'
import { IGames } from '@/interfaces/IGames'
import { IGameStorage } from '@/interfaces/IGameStorage'

export const formatListData = (data: IGames[]): CardProps[] => {
  const storageUserData = localStorage.getItem('@GamesSearch')
  const initialGameStorage = {
    favorite: false,
    stars: 0,
    status: undefined
  }

  if (storageUserData) {
    const storage: IGameStorage[] = JSON.parse(storageUserData)
    return data.map((game) => {
      const gameStorage = storage.find((item) => item.id === game.id)
      if (gameStorage) {
        return { ...game, ...gameStorage }
      }

      return { ...game, ...initialGameStorage }
    })
  }

  return data.map((game) => ({ ...game, ...initialGameStorage }))
}
