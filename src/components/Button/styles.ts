import styled from 'styled-components'

interface Props {
  stateColor: boolean
}

export const Container = styled.button<Props>`
  width: 30%;
  max-width: 120px;
  padding: 8px 5px;
  padding-left: 20px;
  background: ${(props) =>
    props.stateColor ? 'var(--secondary);' : '#979AB0'};
  border-radius: 5px;

  color: var(--text);
  position: relative;
  font-size: clamp(0.7rem, 2vw, 0.8rem);
  transition: filter 0.4s;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translate(0, -50%);
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background: #fff;
  }

  &:hover {
    filter: brightness(93%);
  }

  @media (min-width: 768px) {
    width: 100%;
    margin-right: 10px;
  }
`
