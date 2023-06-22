import React, { useEffect, useState, useRef } from 'react'
import './App.css';
import { createCanvas } from 'algorithmx';
import { network1, network2, networkList } from './networks';
import styled from 'styled-components'

let UnionFind = require('union-find');


const AppStyled = styled.main`
  .wrapper {
    max-inline-size: 1024px;
    margin: 0 auto;
  }
  .grid {
    display: grid;
    grid-template-columns: 300px 1fr;
  }

`

const Form = styled.form`
  padding-block: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
  font-size: 1.5rem;
  label {
    font-weight: bold;
  }
  input {
    font-size: 1.5rem;
    border-radius: .5rem;
    padding: .5rem 1rem;
  }
  button {
    font-size: 2.5rem;
    background: #2a57c4;
    color: white;
    padding: .5rem 1rem;
    border: none;
    cursor: pointer;
    border-radius: .5rem;
  }
`

const H1 = styled.h1`
  font-size: 3rem;
  margin-bottom: .5rem;
`

function App() {
  const [network, updateNetwork] = useState(network1);
  const [nodes, setNodes] = useState(4);
  const [weightList, setWeightList] = useState({});
  const [startAnimation, setStartAnimation] = useState(false);
  const canvasRef = useRef(null)


  const prim = (net, nods, canvas) => {
    let maxW = 10000;
    let n;
    let filtered;
    let i = 0;
    let l = 0;

    let sorted = net.sort(function (a, b) {
      var x = a.w < b.w ? -1 : 1;
      return x;
    });

    console.log(sorted)

    let forest = new UnionFind(nods.length);

    let parent = []
    let rank = []
    let minNode, u, v, w, x, y;

    for (let node of nods) {
      parent.push(node)
      rank.push(0)
    }
    console.log('parent', parent)

    while (l < (nods.length - 1) && i < net.length) {
      minNode = sorted[i];
      console.log(minNode);
      u = minNode.e[0]
      v = minNode.e[1]
      w = minNode.w
      i = i + 1
      console.log('u v w', u, v, w)

      x = forest.find(u)
      y = forest.find(v)
      console.log('x,y', x, y)

      if (x != y) {
        l = l + 1;
        forest.link(u, v);
        console.log(u, v)

        canvas.node(u).highlight().size('1.25x')
        canvas.node(u).color('orange')
        canvas.pause(0.5)

        canvas.edge([u, v]).highlight(0)
        canvas.edge([u, v]).traverse('red').thickness(5)
        canvas.node(v).highlight().size('1.25x')
        canvas.node(v).color('orange')
        canvas.pause(0.5)
      }
    }
  }

  // useEffect(() => {


  //   // canvas.nodes(network.nodes).add().color('blue');

  //   // network.edges.map(item => {
  //   //   canvas.edge(item.e).add({ length: item.w }).label().add({ text: item.w });
  //   // })
  //   // canvas.pause(2);


  // }, [])

  if (startAnimation) {
    prim(network.edges, network.edges, canvasRef.current)
    setStartAnimation(false)
  }

  function generarAristas(numVertices, weightList) {
    const aristas = [];

    // Generar todas las combinaciones posibles de aristas sin repetición, evitando el vértice 0
    for (let i = 0; i < numVertices - 1; i++) {
      for (let j = i + 1; j < numVertices; j++) {
        // Generar un peso aleatorio entre 1 y 10 (puedes ajustar el rango según tus necesidades)
        const peso = Math.floor(Math.random() * 10) + 1;
        debugger
        // Agregar la arista al arreglo de aristas en el formato deseado
        aristas.push({ e: [i, j], w: weightList[i] });
      }
    }

    return aristas;
  }


  function configCanvas(network) {
    const canvas = createCanvas('graph');
    canvasRef.current = canvas
    canvas.remove();
    canvas.size([700, 700]);
    canvas.zoom(5);
    canvas.edgelayout('symmetric');
    canvasRef.current.nodes(network.nodes).add().color('blue')
    network.edges.map(item => {
      canvasRef.current.edge(item.e).add({ length: item.w }).label().add({ text: item.w });
    })
    canvasRef.current.pause(2);
  }

  function getArray(num) {
    var array = [];

    for (var i = 0; i <= num; i++) {
      array.push(i);
    }

    return array;
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nodes = formData.get('nodes')

    // var weightList = [];
    // debugger
    // formData.getAll("w[]").forEach(function (value, index) {
    //   weightList.push(value)
    //   // weightList["w" + (index + 1)] = value;
    // });
    // setWeightList(formData.getAll("w[]"))
    // setTimeout(() => {
    const edges = generarAristas(nodes, formData.getAll("w[]"))
    const n = getArray(nodes - 1)
    const network = { edges, nodes: n }
    configCanvas(network)
    updateNetwork(network);
    setStartAnimation(true);
    // }, 100)
  }

  function handleChange(event) {
    setNodes(event.currentTarget.value)
  }

  return (
    <AppStyled className="App">
      <div className="wrapper">
        <H1>Algoritmo Kruskal</H1>
        <div className="grid">
          <Form action="" onSubmit={handleSubmit}>
            <label htmlFor="">Ingrese el número de nodos</label>
            <input type="text" name="nodes" onChange={handleChange} value={nodes} placeholder='Ingrese el número de nodos' />
            {
              Array.from({ length: nodes }).map((item, index) => {
                return (
                  <>
                    <label htmlFor="">Peso de Edge {index + 1}</label>
                    <input type="text" name="w[]" placeholder={`Peso de Edge ${index + 1}`} />
                  </>
                )
              })
            }
            <button>¡animar!</button>
          </Form>
          <div className="graph-section">
            <div id="graph"></div>
          </div>
        </div>
      </div>
    </AppStyled>
  );
}

export default App;
