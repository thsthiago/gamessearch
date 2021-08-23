import { FC, useCallback, useEffect, useState } from 'react'
import { AiFillChrome, AiFillStar } from 'react-icons/ai'
import { FaPlay } from 'react-icons/fa'
import { GrWindows } from 'react-icons/gr'
import { RiBookmark3Fill } from 'react-icons/ri'
import { PropsData } from '../../pages/jogo/[jogo]'
import { Button } from '../Button'
import { AvaliacoesProps, InteressesProps, UserDadaProps } from '../ListGames'
import { Container, Descricao, Requisitos, Slide } from './styles'

interface GameProps {
  avaliacao: Array<{ id: number; star: boolean }>
  status: string
  favorito: boolean
}

export const Game: FC<PropsData> = ({
  id,
  description,
  game_url,
  genre,
  platform,
  screenshots,
  minimum_system_requirements,
  thumbnail,
  title
}) => {
  const [gameData, setGameData] = useState<GameProps>({
    avaliacao: [
      { id: 1, star: false },
      { id: 2, star: false },
      { id: 3, star: false },
      { id: 4, star: false },
      { id: 5, star: false }
    ],
    status: '',
    favorito: false
  })
  const [storage, setStorage] = useState(null as UserDadaProps | null)
  const [left, setLeft] = useState(0)

  const system = minimum_system_requirements
  const starsValue = gameData.avaliacao.filter((item) => item.star)
  const plataforma = platform.split(',')

  const teste = useCallback(() => {
    setGameData((props) => {
      let avaliacoes: Array<AvaliacoesProps> = []
      let interesses: Array<InteressesProps> = []
      let newFavoritos: Array<{ idJogo: number }> = []

      if (storage) {
        if (storage.avaliacoes) {
          avaliacoes = storage.avaliacoes.filter((item) => item.idJogo !== id)
        }

        if (storage.interesses) {
          interesses = storage.interesses.filter((item) => item.idJogo !== id)
        }

        if (storage.favoritos) {
          newFavoritos = storage.favoritos.filter((item) => item.idJogo !== id)
        }
      }

      newFavoritos = props.favorito
        ? [
            ...newFavoritos,
            {
              idJogo: id
            }
          ]
        : newFavoritos

      localStorage.setItem(
        '@GamesSearch',
        JSON.stringify({
          avaliacoes: [
            ...avaliacoes,
            {
              idJogo: id,
              estrelas: props.avaliacao.filter((item) => item.star).length
            }
          ],
          interesses: [
            ...interesses,
            {
              idJogo: id,
              status: props.status
            }
          ],
          favoritos: newFavoritos
        })
      )

      return { ...props }
    })
  }, [storage])

  const handleStateGame = useCallback(
    (e?) => {
      setGameData((props) => {
        const newData = {
          ...props,
          status: e.target.value
        }
        return { ...newData }
      })
      teste()
    },
    [teste]
  )

  const handleStarsGame = useCallback(
    (value) => {
      let estrelas = value
      const stars: Array<{ id: number; star: boolean }> = []

      for (let i = 0; i <= 4; i++) {
        stars.push({ id: i, star: !(estrelas <= 0) })
        estrelas--
      }

      setGameData((props) => {
        const newData = {
          ...props,
          avaliacao: stars
        }

        return { ...newData }
      })

      teste()
    },
    [teste]
  )

  const handleFavoritoGame = useCallback(() => {
    const newData = {
      ...gameData,
      favorito: !gameData.favorito
    }
    setGameData(newData)

    teste()
  }, [teste, gameData])

  useEffect(() => {
    const storageUserData = localStorage.getItem('@GamesSearch')

    if (storageUserData) {
      const data: UserDadaProps = JSON.parse(storageUserData)
      setStorage(data)

      const newData = {
        avaliacao: [
          { id: 1, star: false },
          { id: 2, star: false },
          { id: 3, star: false },
          { id: 4, star: false },
          { id: 5, star: false }
        ],
        favorito: false,
        status: ''
      } as GameProps

      if (data.avaliacoes) {
        data.avaliacoes.map((item) => {
          if (item.idJogo === id) {
            let estrelas = item.estrelas
            const stars = []

            for (let i = 0; i <= 4; i++) {
              stars.push({ id: i, star: !(estrelas <= 0) })
              estrelas--
            }

            newData.avaliacao = stars
          }
        })
      }

      if (data.interesses) {
        data.interesses.map((item) => {
          if (item.idJogo === id) {
            newData.status = item.status
          }
        })
      }

      if (data.favoritos) {
        data.favoritos.map((item) => {
          if (item.idJogo === id) {
            newData.favorito = true
          }
        })
      }
      setStorage(data)
      setGameData(newData)
    }
  }, [])

  const next = useCallback(() => {
    if (left >= Number(`${screenshots.length - 1}00`)) return

    setLeft(left + 100)
  }, [left])

  const before = useCallback(() => {
    if (left <= 0) return

    setLeft(left - 100)
  }, [left])

  return (
    <Container
      background={screenshots.length === 0 ? thumbnail : screenshots[0].image}>
      <header>
        <div>
          <div>
            <img src={thumbnail} alt={title} />
            <div>
              <h1>{title}</h1>
              <div>
                {plataforma.map((item) => {
                  if (item.trim() === 'Windows') {
                    return <GrWindows key={item} title={item} />
                  }

                  if (item.trim() === 'Web Browser') {
                    return <AiFillChrome key={item} title={item} />
                  }
                })}

                <strong>{genre}</strong>

                <RiBookmark3Fill
                  color={gameData.favorito ? 'E51C44' : '979AB0'}
                  onClick={handleFavoritoGame}
                />
              </div>
            </div>
          </div>

          <div>
            <a href={game_url} target="_blank">
              <FaPlay color="f4f4f4" />
              Jogue agora
            </a>
            <div>
              <strong>
                {starsValue.length > 0 ? `${starsValue.length}.0` : 0}
              </strong>
              <div>
                {gameData.avaliacao.map((item, index) => (
                  <AiFillStar
                    key={item.id}
                    color={item.star ? 'E51C44' : '979AB0'}
                    title={`${index + 1} estrelas`}
                    onClick={() => handleStarsGame(index + 1)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <Descricao>
        <div>
          <Button stateGame={gameData.status} handleStateGame={handleStateGame}>
            Joguei
          </Button>
          <Button stateGame={gameData.status} handleStateGame={handleStateGame}>
            Querendo jogar
          </Button>
          <Button stateGame={gameData.status} handleStateGame={handleStateGame}>
            Jogando
          </Button>
        </div>
        <p>{description}</p>
      </Descricao>

      {system && (
        <Requisitos>
          <h2>Requisitos mínimos de sistemas</h2>

          <table>
            <tbody>
              <tr>
                <th>SO</th>
                <td>{system.os}</td>
              </tr>
              <tr>
                <th>Processador</th>
                <td>{system.processor}</td>
              </tr>
              <tr>
                <th>Memória</th>
                <td>{system.memory}</td>
              </tr>
              <tr>
                <th>Placa de vídeo</th>
                <td>{system.graphics}</td>
              </tr>
              <tr>
                <th>Armazenamento</th>
                <td>{system.storage}</td>
              </tr>
            </tbody>
          </table>
        </Requisitos>
      )}

      {screenshots.length !== 0 && (
        <Slide left={left}>
          <h2>Screenshots:</h2>

          <div>
            <div>
              {screenshots.map((item) => (
                <img key={item.id} src={item.image} alt={title} />
              ))}
            </div>

            <button type="button" onClick={() => before()}></button>
            <button type="button" onClick={() => next()}></button>
          </div>
        </Slide>
      )}
    </Container>
  )
}
