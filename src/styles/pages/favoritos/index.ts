import styled from 'styled-components'

export const Container = styled.ul`
  width: 100%;
  max-width: 1150px;
  margin: 20px auto 0;
  position: relative;

  list-style: none;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
  object-fit: cover;
  padding: 0 2%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`
