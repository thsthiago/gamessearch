import Link from 'next/link'
import { GrWindows } from 'react-icons/gr'
import { AiFillChrome, AiFillStar } from 'react-icons/ai'
import { RiBookmark3Fill } from 'react-icons/ri'
import { CardProps } from '@/context'
import { Container, Descricao } from './styles'

export const Card = (props: CardProps) => {
  const {
    id,
    title,
    short_description,
    genre,
    platform,
    thumbnail,
    stars,
    favorite
  } = props
  const plataforma = platform.split(',')
  const routeGame = title.split(' ').join('-')

  return (
    <Container thumbnail={thumbnail}>
      <Link href={`/jogo/${routeGame}?id=${id}`}>
        <a>
          <div>
            <img src={thumbnail} />
          </div>
          <Descricao>
            <h1>{title}</h1>
            <strong>{short_description}</strong>
            <div>
              <div>
                <strong>{genre}</strong>
                {plataforma.map((item) => {
                  if (item.trim() === 'PC (Windows)') {
                    return <GrWindows key={item} title={item} />
                  }

                  if (item.trim() === 'Web Browser') {
                    return <AiFillChrome key={item} title={item} />
                  }
                })}
              </div>

              <div>
                <div>
                  <AiFillStar color={stars === 0 ? '979AB0' : 'E51C44'} />
                  <span>{stars}</span>
                </div>
                <RiBookmark3Fill color={favorite ? 'E51C44' : '979AB0'} />
              </div>
            </div>
          </Descricao>
        </a>
      </Link>
    </Container>
  )
}
