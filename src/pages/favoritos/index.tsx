import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { HeadComponent, Card } from '@/components'
import { CardProps } from '@/context'
import gamesService from '@/services/games.service'
import { formatListData } from '@/utils'
import { Container } from './styles'

const Favoritos: NextPage = () => {
  const [datas, setDatas] = useState<CardProps[]>([])

  const getGamesData = async () => {
    try {
      const response = await gamesService.getData()
      const games = formatListData(response)
      setDatas(games.filter((item) => item.favorite))
    } catch {}
  }

  useEffect(() => {
    getGamesData()
  }, [])

  return (
    <>
      <HeadComponent title="Jogos favoritos" />
      <Container>
        {datas.map((game) => (
          <Card key={game.id} {...game} />
        ))}
      </Container>
    </>
  )
}

export default Favoritos
