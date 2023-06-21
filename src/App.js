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

`

const Form = styled.form`
  padding-block: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  input {
    font-size: 2.5rem;
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
  const [nodes, setNodes] = useState([]);
  const [startAnimation, setStartAnimation] = useState(false);
  const canvasRef = useRef(null)


  const prim = (net, nods = nodes, canvas) => {
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
    prim(network.edges, nodes, canvasRef.current)
    setStartAnimation(false)
  }

  function configCanvas(network) {
    const canvas = createCanvas('graph');
    canvasRef.current = canvas
    canvas.remove();
    canvas.size([500, 500]);
    canvas.zoom(1.5);
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
    const array = getArray(nodes)
    setNodes(array)
    // const network = networkList[nodes - 1]
    const network = network2
    configCanvas(network)
    updateNetwork(network);
    setStartAnimation(true);
  }

  return (
    <AppStyled className="App">
      <div className="wrapper">
        <H1>Algoritmo Kruskal</H1>
        <Form action="" onSubmit={handleSubmit}>
          <input type="text" name="nodes" placeholder='Ingrese el número de nodos' />
          <button>¡animar!</button>
        </Form>
        <div className="graph-section">
          <div id="graph"></div>
        </div>
      </div>
    </AppStyled>
  );
}

export default App;
