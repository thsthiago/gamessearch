import { FC } from 'react'
import Link from 'next/link'
import { Container, Descricao } from './styles'
import { GrWindows } from 'react-icons/gr'
import { AiFillChrome, AiFillStar } from 'react-icons/ai'
import { RiBookmark3Fill } from 'react-icons/ri'

interface Props {
  id: number
  title: string
  thumbnail: string
  short_description: string
  genre: string
  platform: string
}

export const Card: FC<Props> = ({
  id,
  title,
  short_description,
  genre,
  platform,
  thumbnail
}) => {
  const plataforma = platform.split(',')
  const star: number = 4

  return (
    <Container thumbnail={thumbnail}>
      <Link href="/">
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
                  <AiFillStar color={star === 0 ? '979AB0' : 'E51C44'} />
                  <span>{star}</span>
                </div>
                <RiBookmark3Fill />
              </div>
            </div>
          </Descricao>
        </a>
      </Link>
    </Container>
  )
}
