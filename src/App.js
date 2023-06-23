import React, { useEffect, useState, useRef } from 'react'
import './App.css';
import { createCanvas } from 'algorithmx';
import { network1, network2, networkList } from './networks';
import styled from 'styled-components'

let UnionFind = require('union-find');



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
    background: #0093dc;
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
  const [nodes, setNodes] = useState(3);
  const [aristas, setAristas] = useState(3);
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

    // console.log(sorted)

    let forest = new UnionFind(nods.length);

    let parent = []
    let rank = []
    let minNode, u, v, w, x, y;

    for (let node of nods) {
      parent.push(node)
      rank.push(0)
    }
    // console.log('parent', parent)

    while (l < (nods.length) && i < net.length) {
      minNode = sorted[i];
      // console.log(minNode);
      u = minNode.e[0]
      v = minNode.e[1]
      w = minNode.w
      i = i + 1
      // console.log('u v w', u, v, w)

      x = forest.find(u)
      y = forest.find(v)
      console.log('x,y', x, y)

      if (x != y) {
        l = l + 1;
        forest.link(u, v);
        // console.log(u, v)

        canvas.node(u).highlight().size('1.25x')
        canvas.node(u).color('orange')
        canvas.pause(0.5)

        canvas.edge([u, v]).highlight(0)
        canvas.edge([u, v]).traverse('blue').thickness(5)
        canvas.node(v).highlight().size('1.25x')
        canvas.node(v).color('orange')
        canvas.pause(0.5)
      } else {
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





  function generarAristas(numVertices, weightList) {
    const aristas = [];
    for (let i = 0; i < numVertices - 1; i++) {
      for (let j = i + 1; j < numVertices; j++) {
        const peso = Math.floor(Math.random() * 10) + 1;
        aristas.push({ e: [i, j], w: peso });
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
    const edges = formData.getAll("n1List[]").map((edgeA, index) => {
      return {
        e: [edgeA, formData.getAll("n2List[]")[index]],
        w: formData.getAll("w[]")[index]
      }
    })
    const network = { edges, nodes: getArray(nodes - 1) }

    configCanvas(network)
    prim(network.edges, network.edges, canvasRef.current)

  }

  function obtenerVerticesNoRepetidos(numeroNodos) {
    return numeroNodos * (numeroNodos - 1) / 2;
  }


  function handleChange(event) {
    const maxAristas = obtenerVerticesNoRepetidos(nodes)
    const aristas = Number(event.currentTarget.value)
    if (aristas > maxAristas) {
      alert(`El número máximo permitido de aristas para los vertices ingresados es ${maxAristas}`)
      event.currentTarget.value = maxAristas
      setAristas(maxAristas)
      return
    }
    setAristas(aristas)
  }

  function handleUpdateNodesChange(event) {
    setNodes(event.currentTarget.value)
  }

  return (
    <>
      <H1>Algoritmo Kruskal</H1>
      <div className="grid">
        <Form action="" onSubmit={handleSubmit}>
          <label htmlFor="">Número de Vertices</label>
          <input type="text" name="nodes" value={nodes} onChange={handleUpdateNodesChange} placeholder='Ingrese el número de nodos' />
          <label htmlFor="">Número de Aristas</label>
          <input type="text" placeholder='Número de Aristas' defaultValue={3} onChange={handleChange} name="aristas" />
          {
            Array.from({ length: aristas }).map((item, index) => {
              return (
                <div key={index}>
                  <label htmlFor="">Arista {index + 1}</label>
                  <div className='arista'>
                    <input type="number" placeholder="Nodo 1" name="n1List[]" max={nodes - 1} required />
                    <input type="number" placeholder="Nodo 2" name="n2List[]" max={nodes - 1} required />
                    <input type="number" name="w[]" required placeholder="Peso" />
                  </div>
                </div>
              )
            })
          }
          <button>¡ANIMAR!</button>
        </Form>
        <div className="graph-section">
          <div id="graph"></div>
        </div>
      </div>
    </>
  );
}

export default App;
