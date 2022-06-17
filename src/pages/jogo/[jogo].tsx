import { GetServerSideProps } from 'next'
import { useCallback, useState } from 'react'
import { AiFillChrome, AiFillStar } from 'react-icons/ai'
import { FaPlay } from 'react-icons/fa'
import { GrWindows } from 'react-icons/gr'
import { RiBookmark3Fill } from 'react-icons/ri'
import gamesService from '@/services/games.service'
import { IGameProps } from '@/interfaces/IGames'
import { IGameStorage, Status } from '@/interfaces/IGameStorage'
import { Button, HeadComponent } from '@/components'
import { Container, Descricao, Requisitos, Slide } from './styles'

const initialGameStorage = {
  stars: 0,
  status: undefined,
  favorite: false
}

const handleWithLocalStorage = (data: IGameStorage) => {
  const localStorageData = localStorage.getItem('@GamesSearch')
  if (localStorageData) {
    const dataLocal: IGameStorage[] = JSON.parse(localStorageData)
    const filterData = dataLocal.filter(item => item.id !== data.id)
    localStorage.setItem('@GamesSearch', JSON.stringify([...filterData, data]))
    return
  }
  
  localStorage.setItem('@GamesSearch', JSON.stringify([data]))
}

const Jogo = ({ ...props }: IGameProps) => {
  const {
    id,
    description,
    game_url,
    genre,
    platform,
    screenshots,
    minimum_system_requirements,
    thumbnail,
    title
  } = props

  const [gameStorage, setGameStorage] = useState<IGameStorage>(() => {
    if (typeof window !== 'undefined') {
      const localStorageData = localStorage.getItem('@GamesSearch')
      
      if (localStorageData) {
        const gameLocalStorage:IGameStorage[]  = JSON.parse(localStorageData)
        const game = gameLocalStorage?.find(item => item.id === id)
        return game ? game : initialGameStorage
      }
    }

    return initialGameStorage
  })
  const [left, setLeft] = useState(0)

  const system = minimum_system_requirements
  const plataforma = platform.split(',')

  const handleFavorite = () => {
    setGameStorage(state => {
      const data = {
        ...state,
        favorite: !state.favorite
      }
      handleWithLocalStorage({...data, id })
      return data
    })
  }

  const handleStatusGame = (value: Status) => {
    setGameStorage(state => {
      const data = { ...state, status: value }
      handleWithLocalStorage({...data, id })
      return data
    })
  }

  const handleChangeStars = (stars: number) => {
    setGameStorage(state => {
      const data = { 
        ...state, 
        stars: state.stars === stars ? state.stars - 1 : stars 
      }
      handleWithLocalStorage({...data, id })
      return data
    })
  }

  const next = useCallback(() => {
    if (left >= Number(`${screenshots.length - 1}00`)) return

    setLeft(left + 100)
  }, [left])

  const before = useCallback(() => {
    if (left <= 0) return

    setLeft(left - 100)
  }, [left])

  return (
    <>
      <HeadComponent title={props.title} />
      <Container 
        background={screenshots.length === 0 ? thumbnail : screenshots[0].image}
      >

        <header>
          <div>
            <div>
              <img src={thumbnail} alt={title} />
              <div>
                <h1>{title}</h1>
                <div>
                  {plataforma.map((value) => {
                    const item = value.trim()

                    return item === 'Windows' ? (
                      <GrWindows key={item} title={item} />
                    ) : (
                      <AiFillChrome key={item} title={item} />
                    )
                  })}

                  <strong>{genre}</strong>

                  <RiBookmark3Fill
                    color={gameStorage.favorite ? 'E51C44' : '979AB0'}
                    onClick={handleFavorite}
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
                  {gameStorage.stars > 0 ? `${gameStorage.stars}.0` : 0}
                </strong>
                <div>
                  {Array.from({ length: 5 }).map((_, index) => {
                    const value = index + 1
                    
                    return (
                      <AiFillStar
                        key={value}
                        color={gameStorage.stars >= value ? 'E51C44' : '979AB0'}
                        title={`${value} estrelas`}
                        onClick={() => handleChangeStars(value)}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </header>

        <Descricao>
          <div>
            <Button 
              statusGame={gameStorage.status} 
              status="played" 
              handleStatusGame={handleStatusGame}
            >
              Joguei
            </Button>
            <Button 
              statusGame={gameStorage.status} 
              status="wanting to play" 
              handleStatusGame={handleStatusGame}
            >
              Querendo jogar
            </Button>
            <Button 
              statusGame={gameStorage.status} 
              status="playing" 
              handleStatusGame={handleStatusGame}
            >
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
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const data = await gamesService.findOneGame(query.id as string)
    if (!data) {
      return { notFound: true }
    }
  
    return {
      props: { ...data }
    }
  }catch{
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

}

export default Jogo
