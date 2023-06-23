
import kruskal from './images/kruskal.jpg'
import { Link } from 'react-router-dom'

function Kruskal() {
  return (
    <div>

      <h1 class="fw-300 centrar-texto">Algoritmo Kruskal</h1>
      <main class="contenedor seccion contenido-centrado">
        <div class="kruskal">
          <p class="fw-300">Este algoritmo es utilizado para encontrar el árbol de expansión mínima (Minimum Spanning Tree) en un grafo no dirigido y ponderado. Un árbol de expansión mínima es un subconjunto del grafo original que forma un árbol que conecta todos los nodos y tiene la suma total de pesos mínima.</p>
          <img src={kruskal} />
        </div>
        <h2 class="fw-300">Los pasos básicos del algoritmo de Kruskal son:</h2>

        <ol>
          <li>
            <p>
              Ordenar las aristas: Primero, se ordenan todas las aristas del grafo en orden ascendente según sus pesos
            </p>
          </li>
          <li>
            <p>
              Crear conjuntos disjuntos: A continuación, se crea un conjunto disjunto (también conocido como conjunto de componentes) para cada nodo del grafo.
            </p>
          </li>
          <li>
            <p>
              Recorrer las aristas ordenadas: A partir de la arista con el peso más bajo, se recorren todas las aristas ordenadas.
            </p>
          </li>
          <li>
            <p>
              Comprobación de ciclos: Para cada arista, se comprueba si los nodos que conecta pertenecen a conjuntos disjuntos diferentes. Esto se hace para evitar la formación de ciclos al agregar la arista al árbol de expansión mínima.
            </p>
          </li>
          <li>
            <p>
              Unir conjuntos disjuntos: Si los nodos de la arista pertenecen a conjuntos disjuntos diferentes, se unen los conjuntos en un solo conjunto.
            </p>
          </li>
          <li>
            <p>
              Agregar la arista al árbol: Después de unir los conjuntos, se agrega la arista actual al árbol de expansión mínima.
            </p>
          </li>
          <li>
            <p>
              Repetir los pasos 4-6: Se repiten los pasos 4 a 6 hasta que se hayan recorrido todas las aristas o se hayan agregado N-1 aristas al árbol, donde N es el número de nodos del grafo original.
            </p>
          </li>

        </ol>
        <p>
          Al final del algoritmo, se obtiene el árbol de expansión mínima, que es un subconjunto del grafo original que cumple con las condiciones mencionadas anteriormente.
        </p>

        <div>
          <h3 class="fw-300">A continuación puedes interactuar con nuestro ejercicio</h3>
          <Link to="/kruskal-anim">
            <img src={kruskal} />
          </Link>
        </div>
      </main>

    </div>
  )
}

export default Kruskal
