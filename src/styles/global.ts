import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #161C45;
    --secondary: #E51C44;
    --background: #1D2452;
    --border-color: #979AB0;
    --text: #F2F2F2;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: 'Oswald', sans-serif;
    color: var(--text);
    overflow: hidden;
  }

  #__next  {
    width: 100%;
    height: 100%;
  }

  main {
    width: 100%;
    height: calc(100% - 75px);
    margin-top: 75px;
    overflow-y: scroll;

    @media(min-width: 768px) {
      width: calc(100% - 80px);
      height: 100%;
      margin-top: 0px;
      margin-left: 80px;
    }
  }

  a {
    text-decoration: none;
  }

  body {
    background: var(--background);
    color: var(--color);
  }

  button {
    outline: none;
    cursor: pointer;
  }
`
