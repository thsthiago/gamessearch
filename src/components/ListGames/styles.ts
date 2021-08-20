import styled from 'styled-components'

export const Container = styled.ul`
  width: 100%;
  max-width: 1100px;
  margin: 50px auto 0;
  position: relative;

  list-style: none;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 2%;

  @media (min-width: 768px) {
    justify-content: space-evenly;
  }
`
