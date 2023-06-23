import kruskal from './images/kruskal.jpg'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div>
      {/* <header class="site-header inicio">
        <div class="barra">
          <div class="nombre">
            <h1 class="centrar-texto">Análisis de algoritmos ExpoESCOM 2023</h1>
          </div>

        </div>

        <Link to="kruskal">Algoritmo Kruskal</Link>
      </header> */}

      {/* <section class="imagen">
      </section> */}



      <main class="seccion contenedor">
        <h2 class="fw-300 centrar-texto">A continuación podrás ver la explicación del algoritmo Kruskal</h2>
        <div class="contenedor-anuncios">
          <div class="anuncio">
            <img src={kruskal} alt="anuncio curso algebra" />
            <div class="contenido-anuncio">
              <h3>Algoritmo Kruskal</h3>
              <p>Algoritmo basado en grafos por sus aristas</p>
              <Link to="kruskal">Ver explicación</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
