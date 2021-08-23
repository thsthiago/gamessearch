import { FC, useCallback, useState } from 'react'
import Link from 'next/link'
import { ImBookmarks } from 'react-icons/im'
import { CgGames } from 'react-icons/cg'
import { Container, ContainerNav, NavDesktop, NavMobile } from './styles'
import { useRouter } from 'next/dist/client/router'

export const Header: FC = () => {
  const { pathname } = useRouter()

  const [bars, setBars] = useState(false)

  const activebars = useCallback(() => {
    setBars(!bars)
  }, [bars])

  return (
    <Container>
      <Link href="/">
        <a>
          <img src="/logo.svg" />
          <span>ames search</span>
        </a>
      </Link>

      <ContainerNav>
        <NavMobile bars={bars} path={pathname}>
          <div onClick={() => activebars()}>
            <div></div>
          </div>

          <ul>
            <span></span>
            <li>
              <Link href="/">
                <a>
                  <CgGames size={18} />
                  <span>Lista de jogos</span>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/favoritos">
                <a>
                  <ImBookmarks size={18} />
                  <span>Jogos favoritos</span>
                </a>
              </Link>
            </li>
          </ul>
        </NavMobile>

        <NavDesktop path={pathname}>
          <span></span>
          <ul>
            <li>
              <Link href={`/`}>
                <a>
                  <CgGames size={23} />
                  <span>Lista de jogos</span>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/favoritos">
                <a>
                  <ImBookmarks size={23} />
                  <span>Jogos favoritos</span>
                </a>
              </Link>
            </li>
          </ul>
        </NavDesktop>
      </ContainerNav>
    </Container>
  )
}
