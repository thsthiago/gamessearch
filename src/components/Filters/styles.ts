import styled from 'styled-components'

interface FiltersProps {
  displayValue: boolean
}

export const ContainerFilters = styled.div<FiltersProps>`
  width: 96%;
  max-width: 700px;
  top: -3%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > form:first-of-type {
    margin-right: 3%;
    position: relative;
    z-index: 1;

    > button {
      padding: 15px 5px;
      width: 100%;
      max-width: 200px;
      background: var(--secondary);
      color: var(--text);
      border-radius: 7px;
      display: flex;
      align-items: center;

      svg {
        font-size: clamp(0.8rem, 2vw, 1.3rem);
        margin-right: 10px;
      }

      @media (min-width: 768px) {
        padding: 15px 20px;
      }
    }

    > div {
      display: ${(props) => (props.displayValue ? 'block' : 'none')};
      top: 120%;
      position: absolute;
      background: var(--primary);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
      padding: 20px;
      width: 98%;
      min-width: 300px;
      z-index: 4;

      > div:first-of-type {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
          font-weight: 400;
        }

        button {
          background: transparent;
          color: var(--secondary);
          font-weight: 500;
        }
      }

      > div:nth-child(2),
      > div:nth-child(3) {
        margin-top: 10px;

        strong {
          display: block;
          font-weight: normal;
          color: var(--secondary);
          font-size: clamp(0.9rem, 2.5vw, 1.1rem);
        }

        label {
          display: block;
          position: relative;
          padding-left: 25px;
          margin-top: 8px;
          cursor: pointer;
          font-size: clamp(0.8rem, 2.5vw, 0.9rem);

          input {
            position: absolute;
            width: 0;
            height: 0;

            &:checked ~ span:after {
              display: block;
            }
          }

          span {
            position: absolute;
            left: 0;
            top: 0;
            display: block;
            width: 18px;
            height: 18px;
            border-radius: 10px;
            background: var(--border-color);

            &:after {
              display: none;
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 10px;
              height: 10px;
              border-radius: 5px;
              background: var(--secondary);
            }
          }
        }
      }

      > div:last-of-type {
        margin-top: 10px;
        strong {
          display: block;
          font-weight: 400;
          color: var(--secondary);
          font-size: clamp(0.9rem, 2.5vw, 1.1rem);
        }

        label {
          margin-top: 5px;
          display: block;
          position: relative;
          padding-left: 25px;
          margin-bottom: 5px;
          cursor: pointer;
          font-size: clamp(0.8rem, 2.5vw, 0.9rem);

          input {
            position: absolute;
            width: 0;
            height: 0;
          }

          input:checked ~ span:after {
            display: block;
          }

          input:checked ~ span {
            background: var(--secondary);
          }

          span {
            position: absolute;
            display: block;
            left: 0;
            top: 0;
            width: 20px;
            height: 20px;
            border: 1px solid var(--border-color);
            border-radius: 3px;

            &:after {
              content: '';
              position: absolute;
              display: none;
              left: 45%;
              top: 4px;
              width: 5px;
              height: 10px;
              border: solid white;
              transform: rotate(45deg) translateX(-50%);
              border-width: 0 2px 2px 0;
            }
          }
        }
      }

      > button {
        margin-top: 14px;
        background: var(--secondary);
        font-size: clamp(0.8rem, 2.5vw, 1rem);
        color: var(--text);
        padding: 13px 0;
        width: 100%;
        border-radius: 5px;
        transition: background 0.4s;

        &:hover {
          background: var(--hover-btn);
        }
      }
    }
  }

  > form:last-of-type {
    flex: 1;
    display: flex;
    position: relative;

    input {
      flex: 1;
      background: var(--primary);
      border: none;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      padding: 20px 10px;
      color: var(--text);
    }

    input::placeholder {
      color: var(--border-color);
    }

    button {
      font-size: 0px;
      width: 15%;
      background: var(--background);
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      border-radius: 0px 10px 10px 0;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        color: var(--border-color);
        position: relative;
        font-size: clamp(1.2rem, 2.5vw, 2rem);
      }
    }
  }
`
