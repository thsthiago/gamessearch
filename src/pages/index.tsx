import type { NextPage } from 'next'
import { HeadComponent } from '../components/Head'
import { ListGames } from '../components/ListGames'

const Home: NextPage = () => {
  return (
    <>
      <HeadComponent title="Home" />
      <ListGames />
    </>
  )
}

export default Home
