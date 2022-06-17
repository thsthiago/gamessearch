import { useRouter } from 'next/dist/client/router'
import { useCallback, useRef, useState } from 'react'
import { HiFilter } from 'react-icons/hi'
import { useDebaunce } from '@/hooks/useDebaunce'
import { useGames } from '@/hooks/useGames'
import { Status } from '@/interfaces/IGameStorage'
import { ContainerFilters } from './styles'
import { ChangeEvent } from 'react'

const allGenres = [
  {
    name: 'MMORPG',
    value: 'mmorpg'
  },
  {
    name: 'MMO',
    value: 'mmo'
  },
  {
    name: 'Estratégia',
    value: 'strategy'
  },
  {
    name: 'Fantasia',
    value: 'fantasy'
  },
  {
    name: 'Atirador',
    value: 'shooter'
  },
  {
    name: 'Moba',
    value: 'moba'
  },
  {
    name: 'Corrida',
    value: 'racing'
  },
  {
    name: 'Card',
    value: 'card game'
  },
  {
    name: 'Luta',
    value: 'fighting'
  },
  {
    name: 'Battle Royale',
    value: 'battle royale'
  }
]

export const Filters = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [order, setOrder] = useState('')
  const [status, setStatus] = useState<Status>(undefined)
  const [genres, setGenres] = useState<string[]>([])
  const [open, setIsOpen] = useState(false)
  const { newFilters } = useGames()
  const { pathname } = useRouter()
  const [reset, setReset] = useState(false)
  const searchDebaunce = useDebaunce({ fn: handleSearch, delay: 400 })

  function handleSearch (search: string) {
    newFilters({ search, status, genres, order })
  }

  const handleOpenFilter = () => setIsOpen((props) => !props)

  const resetFilters = () => {
    setOrder('')
    setStatus(undefined)
    setGenres([])
    setIsOpen(false)
    setReset(true)

    setTimeout(() => setReset(false), 100)

    newFilters({
      search: '',
      order: undefined,
      status: undefined,
      genres: []
    })
  }

  const handleFormFilter = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleOpenFilter()

    newFilters({
      search: inputRef.current?.value || '',
      order,
      status,
      genres
    })
  }

  const handleGeneros = useCallback(
    (e) => {
      if (e.target.checked) {
        setGenres((props: Array<string>) => [...props, e.target.value])
      } else {
        const newGeneros = genres.filter((genero) => genero !== e.target.value)
        setGenres(newGeneros)
      }
    },
    [genres]
  )

  const handleInteresses = useCallback((e) => {
    setStatus(e.target.value)
  }, [])

  const handleOrdem = useCallback((e) => {
    setOrder(e.target.value)
  }, [])

  return (
    <ContainerFilters displayValue={open}>
      {pathname !== '/favoritos' && (
        <form onSubmit={handleFormFilter}>
          <button type="button" onClick={handleOpenFilter}>
            <HiFilter />
            Filtro
          </button>
          {!reset && (
            <div>
              <div>
                <h2>Filtros:</h2>
                <button type="button" onClick={resetFilters}>
                  Remover filtros
                </button>
              </div>

              <div>
                <strong>Ordenar por:</strong>
                <label>
                  A-Z
                  <input
                    type="radio"
                    onChange={handleOrdem}
                    name="order"
                    value="a-z"
                  />
                  <span></span>
                </label>

                <label>
                  Avaliações
                  <input
                    type="radio"
                    onChange={handleOrdem}
                    name="order"
                    value="avaliacao"
                  />
                  <span></span>
                </label>
              </div>

              <div>
                <strong>Interesses:</strong>
                <label>
                  Joguei
                  <input
                    type="radio"
                    onChange={handleInteresses}
                    name="interesse"
                    value="played"
                  />
                  <span></span>
                </label>

                <label>
                  Querendo jogar
                  <input
                    type="radio"
                    onChange={handleInteresses}
                    name="interesse"
                    value="wanting to play"
                  />
                  <span></span>
                </label>

                <label>
                  jogando
                  <input
                    type="radio"
                    onChange={handleInteresses}
                    name="interesse"
                    value="playing"
                  />
                  <span></span>
                </label>
              </div>

              <div>
                <strong>Genêros:</strong>

                {allGenres.map(genre => (
                  <label key={genre.value}>
                    {genre.name}
                    <input
                      type="checkbox"
                      name={genre.value}
                      value={genre.value}
                      onChange={handleGeneros}
                    />
                    <span></span>
                  </label>
                ))}
              </div>

              <button type="submit">Filtrar</button>
            </div>
          )}
        </form>
      )}

      <form>
        <input
          onChange={(e) => searchDebaunce(e.target.value)}
          placeholder="Digite o nome do jogo"
        />
      </form>
    </ContainerFilters>
  )
}
