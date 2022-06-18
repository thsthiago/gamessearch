import styled from 'styled-components'

interface Props {
  background: string
}

interface SlideProps {
  left: number
}

export const Container = styled.div<Props>`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;

  header {
    width: 100%;
    height: 100%;
    max-height: 300px;
    background: url(${(props) => `${props.background}`}) no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    padding: 0 2%;
    margin-bottom: 15%;

    > div {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      position: relative;
      top: 40%;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > div:first-of-type {
        img {
          width: 100%;
          max-width: 280px;
          min-width: 180px;
        }

        h1 {
          margin-left: 10px;
          font-weight: 400;
          font-size: clamp(1.4rem, 2vw, 2rem);
        }

        div {
          padding-top: 10px;
          padding-left: 10px;

          div {
            display: flex;
            align-items: center;

            svg:nth-child(1),
            svg:nth-child(2) {
              color: red;
            }

            svg:last-of-type {
              font-size: clamp(1rem, 2.5vw, 1.5rem);
              cursor: pointer;
            }

            strong {
              margin-left: 7px;
              background: var(--secondary);
              padding: 1px 4px;
              border-radius: 7px;
              margin-right: 5px;
              font-weight: 400;
              font-size: clamp(0.7rem, 2vw, 1rem);
            }
          }
        }
      }

      > div:last-of-type {
        margin-left: 20px;
        width: 40%;
        max-width: 150px;

        a {
          display: block;
          background: var(--secondary);
          color: var(--text);
          width: 100%;
          padding: 8px 0;
          border-radius: 3px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          margin-bottom: 10px;
          transition: background 0.4s;

          &:hover {
            background: var(--hover-btn);
          }
        }

        div {
          display: flex;
          align-items: center;

          strong {
            font-weight: 400;
            margin-right: 4px;
          }

          svg {
            font-size: clamp(1.2rem, 2.3vw, 1.5rem);
            cursor: pointer;
          }
        }
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        180deg,
        rgba(29, 36, 82, 0) 2.08%,
        #1d2452 100%
      );
    }
  }

  @media (min-width: 768px) {
    header {
      margin-bottom: 0;

      > div {
        align-items: flex-end;

        > div:first-of-type {
          display: flex;
          align-items: flex-end;
        }
      }
    }
  }
`

export const Descricao = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 20px auto 0;
  padding: 0 2%;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p {
    margin-top: 20px;
    color: var(--border-color);
    font-weight: lighter;
    font-size: clamp(0.8, 2.5vw, 1.2rem);
  }

  @media (min-width: 1100px) {
    padding: 0;

    div {
      display: block;
    }
  }
`

export const Requisitos = styled.div`
  width: 96%;
  max-width: 1000px;
  margin: 20px auto 0;

  h2 {
    font-weight: 400;
    margin-bottom: 20px;
  }

  table,
  td,
  th {
    border: 1px solid var(--border-color);
    border-collapse: collapse;
  }

  table {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;

    tr {
      th {
        padding: 5px;
        color: var(--secondary);
        font-weight: 400;
      }

      td {
        padding: 5px;
        font-weight: lighter;
      }
    }
  }
`

export const Slide = styled.div<SlideProps>`
  width: 96%;
  max-width: 1000px;
  margin: 10px auto 0;
  padding-bottom: 40px;

  h2 {
    font-size: clamp(1.2rem, 2vw, 1.4rem);
    font-weight: 400;
    margin: 20px 0 10px;
  }

  > div {
    width: 100%;
    overflow: hidden;
    position: relative;
    max-width: 800px;
    margin: 0 auto;

    div {
      display: flex;
      transform: ${(props) => `translateX(-${props.left}%)`};
      transition: transform 0.3s;

      img {
        width: 100%;
      }
    }

    button {
      width: 5%;
      max-width: 30px;
      height: 40px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    button:first-of-type {
      background: url('/arrow-left.svg') no-repeat;
      background-size: 100% 100%;
      left: 2%;
    }

    button:last-of-type {
      background: url('/arrow-right.svg') no-repeat;
      background-size: 100% 100%;
      right: 2%;
    }
  }

  @media (min-width: 768px) {
    h2 {
      margin: 20px 0 30px;
    }

    > div button {
      height: 70px;
    }
  }
`
