import styled from 'styled-components'

interface Props {
  thumbnail: string
}

export const Container = styled.li<Props>`
  width: 46%;
  background: var(--primary);
  height: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  & + & {
    margin-top: 30px;
  }

  a {
    width: 100%;
    color: var(--text);

    > div:first-of-type {
      width: 100%;

      img {
        width: 100%;
      }
    }
  }

  @media (min-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`

export const Descricao = styled.div`
  padding: 10px;

  h1 {
    font-size: clamp(0.9rem, 2vw, 1.3rem);
    font-weight: 400;
  }

  > strong {
    font-size: clamp(0.8rem, 2vw, 1rem);
    color: var(--border-color);
    font-weight: 400;
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    > div:first-of-type {
      display: flex;
      align-items: center;

      strong {
        display: block;
        background: var(--secondary);
        padding: 1px 4px;
        border-radius: 7px;
        margin-right: 5px;
        font-weight: 400;
        font-size: clamp(0.7rem, 2vw, 1rem);
      }

      svg {
        color: var(--border-color);
      }

      svg + svg {
        margin-left: 4px;
      }
    }

    > div:last-of-type {
      display: flex;
      align-items: center;

      > div {
        position: relative;

        svg {
          position: relative;
          top: 5px;
          font-size: clamp(1.4rem, 2.3vw, 2rem);
        }

        span {
          position: absolute;
          font-size: clamp(0.6rem, 2vw, 0.9rem);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      > svg {
        font-size: clamp(0.8rem, 2.3vw, 1.4rem);
      }
    }
  }
`
