import styled from 'styled-components'

interface Props {
  left: number
}

export const Container = styled.div<Props>`
  width: 100%;
  height: 100%;
  max-height: 170px;
  overflow: hidden;
  position: relative;
  z-index: -1;

  div {
    width: 100%;
    display: flex;
    transition: transform 0.4s;
    transform: ${(props) => `translateX(-${props.left}%);`};

    img {
      position: relative;
      top: 0px;
      width: 100%;
    }
  }

  &::before {
    content: '';
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      180deg,
      rgba(29, 36, 82, 0) 2.08%,
      var(--background) 100%
    );
    z-index: 2;
  }

  @media (min-width: 768px) {
    max-height: 250px;

    div img {
      top: -100px;
    }
  }
`
