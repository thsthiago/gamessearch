import { useEffect, useState, FC } from 'react'
import { CardProps, useGames } from '../../hooks'
import { api } from '../../services/api'
import { Card } from '../Card'
import { Observer } from '../Observer'
import { Container } from './styles'

export interface AvaliacoesProps {
  idJogo: number
  estrelas: number
}

export interface InteressesProps {
  idJogo: number
  status: string
}

export interface UserDadaProps {
  avaliacoes: Array<AvaliacoesProps>
  interesses: Array<InteressesProps>
  favoritos: Array<{ idJogo: number }>
}

export const ListGames: FC = () => {
  const [datas, setDatas] = useState<Array<CardProps>>([])
  const [games, setGames] = useState<Array<CardProps>>([])
  const [isFilter, setIsFilter] = useState(false)
  const { filter, newFilters } = useGames()

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

          const primeirosGames = newData.slice(0, 16)
          setDatas(newData)
          setGames(primeirosGames)
        } else {
          const newData: Array<CardProps> = []

          data.forEach((item: CardProps) => {
            const estrelas = 0
            const favorito = false
            const interesse = ''

            newData.push({
              ...item,
              estrelas,
              favorito,
              interesse
            })
          })

          const primeirosGames = newData.slice(0, 16)
          setDatas(newData)
          setGames(primeirosGames)
        }
      })
      .catch((err) => console.log(err.message))

    return () => {
      const primeirosGames = datas.slice(0, 16)
      setGames(primeirosGames)
      newFilters({
        search: '',
        generos: [],
        interesses: '',
        ordem: ''
      })
    }
  }, [])

  useEffect(() => {
    if (
      filter.search === '' &&
      filter.ordem === '' &&
      filter.interesses === '' &&
      filter.generos.length === 0
    ) {
      const primeirosGames = datas.slice(0, 16)
      setGames(primeirosGames)

      setIsFilter(false)
    } else {
      let gameFilter: Array<CardProps> = []

      if (filter.search !== '') {
        const regex = new RegExp(filter.search.trim().toLowerCase(), 'gi')

        datas.forEach((jogo) => {
          if (jogo.title.toLowerCase().trim().search(regex) !== -1) {
            gameFilter.push(jogo)
          }
        })
      }

      if (filter.generos.length !== 0) {
        if (filter.search !== '') {
          const newGeneros: Array<CardProps> = []

          gameFilter.forEach((jogo) => {
            filter.generos.forEach((genero) => {
              if (jogo.genre.toLowerCase() === genero) {
                newGeneros.push(jogo)
              }
            })
          })

          gameFilter = newGeneros
        } else {
          datas.forEach((jogo) => {
            filter.generos.forEach((genero) => {
              if (jogo.genre.toLowerCase() === genero) {
                gameFilter.push(jogo)
              }
            })
          })
        }
      }

      if (filter.interesses !== '') {
        if (filter.generos.length !== 0 || filter.search !== '') {
          const interesseGame = [] as Array<CardProps>

          gameFilter.forEach((jogo) => {
            if (jogo.interesse.toLowerCase() === filter.interesses) {
              interesseGame.push(jogo)
            }
          })

          gameFilter = interesseGame
        } else {
          datas.forEach((jogo) => {
            if (jogo.interesse.toLowerCase() === filter.interesses) {
              gameFilter.push(jogo)
            }
          })
        }
      }

      if (filter.ordem === 'a-z') {
        if (
          filter.generos.length !== 0 ||
          filter.interesses !== '' ||
          filter.search !== ''
        ) {
          gameFilter.sort((a, b) => {
            if (a.title > b.title) {
              return 1
            }

            if (a.title < b.title) {
              return -1
            }

            return 0
          })
        } else {
          datas.sort((a, b) => {
            if (a.title > b.title) {
              return 1
            }

            if (a.title < b.title) {
              return -1
            }

            return 0
          })

          gameFilter.push(...datas)
        }
      } else if (filter.ordem === 'avaliacao') {
        if (
          filter.generos.length !== 0 ||
          filter.interesses !== '' ||
          filter.search !== ''
        ) {
          gameFilter.sort((a, b) => {
            if (a.estrelas > b.estrelas) {
              return -1
            }

            if (a.estrelas < b.estrelas) {
              return 1
            }

            return 0
          })
        } else {
          datas.sort((a, b) => {
            if (a.estrelas > b.estrelas) {
              return -1
            }

            if (a.estrelas < b.estrelas) {
              return 1
            }

            return 0
          })

          gameFilter.push(...datas)
        }
      }

      setGames(gameFilter)

      setIsFilter(true)
    }
  }, [filter])

  const newGames = () => {
    setGames((props) => [
      ...props,
      ...datas.slice(props.length, props.length + 16)
    ])
  }

  return (
    <>
      <Container>
        {games.map((data) => (
          <Card key={data.id} {...data} />
        ))}
      </Container>
      {games.length !== 0 && !isFilter && (
        <Observer callback={() => newGames()} />
      )}
    </>
  )
}
