import styled, { css } from 'styled-components'

interface PropsNav {
  path: string
  bars?: boolean
}

const barsEffect = {
  barsEffect: css`
    width: 0px;
    &::before {
      transform: rotate(45deg) translate(0px);
      -webkit-transform: rotate(45deg) translate(0px);
    }
    &::after {
      transform: rotate(-45deg) translate(0px);
      -webkit-transform: rotate(-45deg) translate(0px);
    }
  `
}

export const Container = styled.header`
  width: 100%;
  height: 70px;
  background-color: var(--primary);
  box-shadow: 0px 0px 15px var(--secondary);
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  padding: 0 2%;
  transition: width 0.3s;

  > a {
    margin: auto;
    color: var(--secondary);

    img {
      position: relative;
      bottom: -8px;
    }

    span {
      font-size: 30px;
      font-family: 'Teko', sans-serif;
    }
  }

  @media (min-width: 768px) {
    width: 80px;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    z-index: 3;

    > a {
      position: absolute;
      top: 10px;
      left: 13px;
      width: 180px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      margin-top: 20px;

      img {
        max-width: 120px;
        position: initial;
      }

      span {
        font-family: 'Teko', sans-serif;
        color: var(--secondary);
        opacity: 0;
        font-size: 35px;
        position: relative;
        bottom: -3px;
        transition: opacity 0.45s;
      }
    }

    &:hover {
      width: 200px;
    }

    &:hover > a span {
      opacity: 1;
    }
  }
`

export const ContainerNav = styled.nav`
  > div:last-of-type {
    display: none;
  }

  @media (min-width: 768px) {
    > div:first-of-type {
      display: none;
    }

    > div:last-of-type {
      display: flex;
    }
  }
`

export const NavMobile = styled.div<PropsNav>`
  > div {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5%;
    z-index: 100;
    cursor: pointer;

    div {
      cursor: pointer;
      margin-left: -50%;
      margin-top: -3.5px;
      background: white;
      top: 50%;
      left: 50%;
      &,
      &::before,
      &::after {
        cursor: pointer;
        position: absolute;
        width: 40px;
        height: 5px;
        border-radius: 5px;
        background: var(--secondary);
        transition: 0.4s;
        -webkit-transition: 0.4s;
      }

      &::before {
        content: '';
        transform: translateY(-15px);
        -webkit-transform: translateY(-15px);
      }

      &:after {
        content: '';
        transform: translateY(15px);
        -webkit-transform: translateY(15px);
      }

      & {
        ${(props) => props.bars && barsEffect.barsEffect}
      }
    }
  }

  ul {
    width: 100%;
    list-style: none;
    position: absolute;
    left: 0;
    background-color: var(--primary);
    display: flex;
    z-index: 4;

    > span {
      ${(props) =>
        props.path !== '/' && props.path !== '/favoritos' && 'display: none;'}
      position: absolute;
      top: 0;
      transition: left 0.4s;
      ${(props) => (props.path === '/' ? 'left: 0%; ' : 'left: 50%;')}
      width: 50%;
      height: 100%;
      background: var(--secondary);

      ${(props) =>
        props.bars
          ? `
        bottom: -38px;
        z-index: 0;
        `
          : `
        bottom: 0px;
        z-index: -1;
        `}
    }

    ${(props) => (props.bars ? 'top: 100%;' : 'top: 0%; z-index: -1;')}

    li {
      flex: 1;
      display: flex;
      justify-content: center;
      position: relative;
      z-index: 1;

      a {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        height: 40px;
        text-decoration: none;
        color: var(--border-color);
        transition: color 0.4s;
      }
    }

    li:first-of-type {
      a {
        ${(props) => props.path === '/' && 'color: var(--text);'}
      }
    }

    li:last-of-type {
      a {
        ${(props) => props.path === '/favoritos' && 'color: var(--text);'}
      }
    }
  }
`

export const NavDesktop = styled.div<PropsNav>`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;

  > span {
    ${(props) =>
      props.path !== '/' && props.path !== '/favoritos' && 'display: none;'}
    height: 52px;
    width: 100%;
    position: absolute;
    transition: top 0.4s;
    ${(props) => (props.path === '/' ? 'top: 0%;' : 'top: 50%;')}
    background-color: var(--secondary);
    z-index: -1;
  }

  ul {
    width: 95%;
    list-style: none;

    li:first-of-type {
      a svg {
        position: relative;
        left: -2px;
      }
    }

    li {
      width: 150px;
      display: flex;
      justify-content: center;

      a {
        color: var(--border-color);
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        position: relative;
        left: 8px;
        transition: color 0.4s;

        svg {
          margin-right: 10px;
        }

        span {
          opacity: 0;
          transition: opacity 0.45s;

          ${Container}:hover & {
            opacity: 1;
          }
        }
      }

      &:hover a {
        color: var(--text);
      }
    }

    li:first-of-type {
      a {
        ${(props) => props.path === '/' && 'color: var(--text);'}
      }
    }

    li:last-of-type {
      a {
        ${(props) => props.path === '/favoritos' && 'color: var(--text);'}
      }
    }
  }
`
