import { useEffect, useState, FC, useMemo } from 'react'
import { CardProps, FilterProps, Ordination } from '@/context'
import { useGames } from '@/hooks/useGames'
import gamesService from '@/services/games.service'
import { formatListData } from '@/utils'
import { Card, Observer } from '@/components'
import { Container } from './styles'

const filterData = (
  datas: CardProps[],
  filter: FilterProps,
  pageSize: number
) => {
  const newData = datas.filter((item) => {
    if (
      (filter.genres.length === 0 ||
        filter.genres.includes(item.genre.toLowerCase())) &&
      (filter.status === undefined || filter.status === item.status) &&
      (filter.search === '' ||
        item.title.toLowerCase().includes(filter.search.toLowerCase()))
    ) {
      return true
    }

    return false
  })

  return newData.slice(0, 16 * pageSize)
}

const sortingDatas = (datas: CardProps[], order: Ordination) => {
  if (order === 'a-z') {
    return datas.sort((before, after) =>
      before.title.localeCompare(after.title)
    )
  }

  if (order === 'avaliacao') {
    return datas.sort((before, after) => after.stars - before.stars)
  }

  return datas
}

export const ListGames: FC = () => {
  const [datas, setDatas] = useState<CardProps[]>([])
  const [pageSize, setPageSize] = useState(1)
  const { filter } = useGames()

  const getGamesData = async () => {
    try {
      const response = await gamesService.getData()
      const games = formatListData(response)
      setDatas(games)
    } catch {}
  }

  const games = useMemo(
    () => filterData(sortingDatas(datas, filter.order), filter, pageSize),
    [datas, pageSize, filter]
  )

  useEffect(() => {
    getGamesData()
  }, [])

  return (
    <>
      <Container>
        {games.map((data) => (
          <Card key={data.id} {...data} />
        ))}
      </Container>

      {games.length !== 0 && (
        <Observer callback={() => setPageSize((state) => state + 1)} />
      )}
    </>
  )
}
