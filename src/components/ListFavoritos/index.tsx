import { useEffect, useState, FC } from 'react'

import { CardProps, useGames } from '../../hooks'
import { api } from '../../services/api'
import { Card } from '../Card'
import { UserDadaProps } from '../ListGames'
import { Container } from './styles'

export const ListFavoritos: FC = () => {
  const [games, setGames] = useState<Array<CardProps>>([])
  const [gamesFavoritos, setGamesFavoritos] = useState<Array<CardProps>>([])
  const { filter, newFilters } = useGames()
  useEffect(() => {
    const gameFilter: Array<CardProps> = []

    if (filter.search !== '') {
      const regex = new RegExp(filter.search.trim().toLowerCase(), 'gi')

      gamesFavoritos.forEach((jogo) => {
        if (jogo.title.toLowerCase().trim().search(regex) !== -1) {
          gameFilter.push(jogo)
        }
      })

      setGames(gameFilter)
    } else {
      setGames(gamesFavoritos)
    }
  }, [filter])

  useEffect(() => {
    const storageUserData = localStorage.getItem('@GamesSearch')

    api
      .get('/games')
      .then(({ data }) => {
        if (storageUserData) {
          const newData: Array<CardProps> = []
          const storage: UserDadaProps = JSON.parse(storageUserData)

          data.forEach((item: CardProps) => {
            const infos = {
              estrelas: 0,
              favorito: false,
              interesse: ''
            }

            storage.avaliacoes.forEach((starItem) => {
              if (item.id === starItem.idJogo) {
                infos.estrelas = starItem.estrelas
              }
            })

            storage.favoritos.forEach((favoritoGame) => {
              if (item.id === favoritoGame.idJogo) {
                infos.favorito = true
              }
            })

            storage.interesses.forEach((interesseGame) => {
              if (item.id === interesseGame.idJogo) {
                infos.interesse = interesseGame.status
              }
            })

            newData.push({
              ...item,
              ...infos
            })
          })

          const favoritos = newData.filter((game) => game.favorito)
          setGamesFavoritos(favoritos)
          setGames(favoritos)
        }
      })
      .catch((err) => console.log(err.message))

    return () => {
      newFilters({
        search: '',
        generos: [],
        interesses: '',
        ordem: ''
      })
    }
  }, [])

  return (
    <Container>
      {games.map((game) => (
        <Card key={game.id} {...game} />
      ))}
    </Container>
  )
}
