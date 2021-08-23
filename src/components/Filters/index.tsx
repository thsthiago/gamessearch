import { useRouter } from 'next/dist/client/router'
import { FC, useCallback, useRef, useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { HiFilter } from 'react-icons/hi'
import { useGames } from '../../hooks'
import { ContainerFilters } from './styles'

export const Filters: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [ordem, setOrdem] = useState('')
  const [interesses, setInteresses] = useState('')
  const [generos, setGeneros] = useState([] as Array<string>)
  const [display, setDIsplay] = useState(false)
  const { newFilters } = useGames()
  const { pathname } = useRouter()
  const [reset, setReset] = useState(false)

  const handleForm = useCallback(
    (e) => {
      e.preventDefault()

      newFilters({
        search: inputRef.current?.value || '',
        ordem,
        interesses,
        generos
      })
    },
    [ordem, interesses, generos]
  )

  const resetFilters = useCallback(() => {
    setOrdem('')
    setInteresses('')
    setGeneros([])
    setDIsplay(false)
    setReset(true)

    setTimeout(() => setReset(false), 100)

    newFilters({
      search: '',
      ordem: '',
      interesses: '',
      generos: []
    })
  }, [ordem, interesses, generos])

  const handleFormFilter = useCallback(
    (e) => {
      e.preventDefault()

      newFilters({
        search: inputRef.current?.value || '',
        ordem,
        interesses,
        generos
      })
    },
    [ordem, interesses, generos]
  )

  const handleGeneros = useCallback(
    (e) => {
      if (e.target.checked) {
        setGeneros((props: Array<string>) => [...props, e.target.value])
      } else {
        const newGeneros = generos.filter((genero) => genero !== e.target.value)
        setGeneros(newGeneros)
      }
    },
    [generos]
  )

  const handleInteresses = useCallback((e) => {
    setInteresses(e.target.value)
  }, [])

  const handleOrdem = useCallback((e) => {
    setOrdem(e.target.value)
  }, [])

  const handleActiveFilter = useCallback(() => {
    setDIsplay((props) => !props)
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }, [pathname])

  useEffect(() => {
    return () => {
      setInteresses('')
      setOrdem('')
      setGeneros([])

      newFilters({
        search: '',
        ordem: '',
        interesses: '',
        generos: []
      })
    }
  }, [])

  return (
    <ContainerFilters displayValue={display}>
      {pathname !== '/favoritos' && (
        <form onSubmit={handleFormFilter}>
          <button type="button" onClick={handleActiveFilter}>
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
                    value="joguei"
                  />
                  <span></span>
                </label>

                <label>
                  Querendo jogar
                  <input
                    type="radio"
                    onChange={handleInteresses}
                    name="interesse"
                    value="querendo jogar"
                  />
                  <span></span>
                </label>

                <label>
                  jogando
                  <input
                    type="radio"
                    onChange={handleInteresses}
                    name="interesse"
                    value="jogando"
                  />
                  <span></span>
                </label>
              </div>

              <div>
                <strong>Genêros:</strong>
                <label>
                  MMORPG
                  <input
                    type="checkbox"
                    onChange={handleGeneros}
                    name="MMORPG"
                    value="mmorpg"
                  />
                  <span></span>
                </label>

                <label>
                  MMO
                  <input
                    type="checkbox"
                    onChange={handleGeneros}
                    name="MMO"
                    value="mmo"
                  />
                  <span></span>
                </label>

                <label>
                  Estratégia
                  <input
                    type="checkbox"
                    onChange={handleGeneros}
                    name="MMO"
                    value="strategy"
                  />
                  <span></span>
                </label>

                <label>
                  Fantasia
                  <input
                    type="checkbox"
                    onChange={handleGeneros}
                    name="MMO"
                    value="fantasy"
                  />
                  <span></span>
                </label>

                <label>
                  Atirador
                  <input
                    type="checkbox"
                    onChange={handleGeneros}
                    name="shooter"
                    value="shooter"
                  />
                  <span></span>
                </label>

                <label>
                  Moba
                  <input
                    type="checkbox"
                    onChange={handleGeneros}
                    name="moba"
                    value="moba"
                  />
                  <span></span>
                </label>

                <label>
                  Corrida
                  <input
                    type="checkbox"
                    onChange={handleGeneros}
                    name="racing"
                    value="racing"
                  />
                  <span></span>
                </label>

                <label>
                  Card
                  <input
                    type="checkbox"
                    onChange={handleGeneros}
                    name="card game"
                    value="card game"
                  />
                  <span></span>
                </label>

                <label>
                  Luta
                  <input
                    type="checkbox"
                    onChange={handleGeneros}
                    name="fighting"
                    value="fighting"
                  />
                  <span></span>
                </label>

                <label>
                  Battle Royale
                  <input
                    type="checkbox"
                    name="battle royale"
                    value="battle royale"
                    onChange={handleGeneros}
                  />
                  <span></span>
                </label>
              </div>

              <button type="submit">Filtrar</button>
            </div>
          )}
        </form>
      )}

      <form onSubmit={handleForm}>
        <input
          ref={inputRef}
          placeholder="Digite o nome do jogo ou genêro..."
        />
        <button type="submit">
          <FiSearch />
        </button>
      </form>
    </ContainerFilters>
  )
}
