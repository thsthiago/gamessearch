import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { api } from '../../services/api'
import { HeadComponent } from '../../components/Head'
import { Game } from '../../components/Game'

interface PropsSystem {
  graphics: string
  memory: string
  os: string
  processor: string
  storage: string
}

interface PropsScrenshots {
  id: number
  image: string
}

export interface PropsData {
  id: number
  title: string
  description: string
  game_url: string
  platform: string
  genre: string
  minimum_system_requirements: PropsSystem
  thumbnail: string
  screenshots: Array<PropsScrenshots>
}

const Jogo: FC<PropsData> = ({ ...rest }) => {
  return (
    <>
      <HeadComponent title={rest.title} />
      <Game {...rest} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await api.get(`/game?id=${query.id}`)

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      ...data
    }
  }
}

export default Jogo
