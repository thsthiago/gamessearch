import { NextPage } from 'next'
import { HeadComponent } from '../components/Head'
import { ListFavoritos } from '../components/ListFavoritos'

const Favoritos: NextPage = () => {
  return (
    <>
      <HeadComponent title="Jogos favoritos" />
      <ListFavoritos />
    </>
  )
}

export default Favoritos
