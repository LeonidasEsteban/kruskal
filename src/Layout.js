import { Outlet, Link } from "react-router-dom";
import styled from 'styled-components'
import escom from './images/escom.jpeg'

const Menu = styled.nav`
  background: #0093dc;

  ul {
    display: flex;
    list-style: none;
    gap: 1rem;
    padding: 0;
    margin: 0;
  }
  a {
    background: #0093dc;
    color: white;
    padding: 1rem;
    display: block;
    &:is(.logo) {
      padding: 0;
    }
  }
  img {
    vertical-align: middle;
  }
`
const AppStyled = styled.main`
  .wrapper {
    max-inline-size: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  .grid {
    display: grid;
    grid-template-columns: 300px 1fr;
  }
  .arista {
    display: flex;
    gap: 1rem;
    input {
      flex: 1;
      width: 100%;
      font-size: .8rem;
      &:invalid {
        border-color: red;
      }
      &:placeholder-shown:invalid {
        border-color: grey;
      }
      &:valid {
        border-color: green;
      }
      &::-webkit-inner-spin-button {
        display: none;
      }
    }
  }

`
function Layout({ children }) {
  return (
    <AppStyled className="App">
      <Menu>
        <div className="wrapper">
          <ul>
            <li>
              <Link to="/" className="logo">
                <img src={escom} alt="" height="50" />
              </Link>
            </li>
            <li>
              <Link to="/kruskal">Kruskal</Link>
            </li>
            <li>
              <Link to="/kruskal-anim">Algoritmo Krustal Interactivo</Link>
            </li>
          </ul>
        </div>
      </Menu>
      <div className="wrapper">
        <Outlet />
      </div>
      <footer>
        <div className="wrapper">
          <p>
            Análisis de algoritmos ExpoESCOM 2023
          </p>
        </div>
      </footer>
    </AppStyled>
  )
}

export default Layout
