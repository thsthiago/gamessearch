import { FC } from 'react'
import { Card } from '../Card'
import { Container } from './styles'

export const ListGames: FC = () => {
  const datas = [
    {
      id: 1,
      title: 'Astral Heroes',
      thumbnail: 'https://www.freetogame.com/g/117/thumbnail.jpg',
      short_description:
        'A free-to-play collectable card game from the creators of Astral Masters. ',
      genre: 'Card Game',
      platform: 'PC (Windows), Web Browser'
    },
    {
      id: 2,
      title: 'Astral Heroes',
      thumbnail: 'https://www.freetogame.com/g/117/thumbnail.jpg',
      short_description:
        'A free-to-play collectable card game from the creators of Astral Masters. ',
      genre: 'Card Game',
      platform: 'PC (Windows), Web Browser'
    },
    {
      id: 3,
      title: 'Astral Heroes',
      thumbnail: 'https://www.freetogame.com/g/117/thumbnail.jpg',
      short_description:
        'A free-to-play collectable card game from the creators of Astral Masters. ',
      genre: 'Card Game',
      platform: 'PC (Windows), Web Browser'
    },
    {
      id: 4,
      title: 'Astral Heroes',
      thumbnail: 'https://www.freetogame.com/g/117/thumbnail.jpg',
      short_description:
        'A free-to-play collectable card game from the creators of Astral Masters. ',
      genre: 'Card Game',
      platform: 'PC (Windows), Web Browser'
    },
    {
      id: 5,
      title: 'Astral Heroes',
      thumbnail: 'https://www.freetogame.com/g/117/thumbnail.jpg',
      short_description:
        'A free-to-play collectable card game from the creators of Astral Masters. ',
      genre: 'Card Game',
      platform: 'PC (Windows), Web Browser'
    }
  ]

  return (
    <Container>
      {datas.map((data) => (
        <Card key={data.id} {...data} />
      ))}
    </Container>
  )
}
