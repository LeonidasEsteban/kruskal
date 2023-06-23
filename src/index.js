import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Layout from './Layout';
import Kruskal from './kruskal';
import Home from './home';
import reportWebVitals from './reportWebVitals';

import { Routes, Route, BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="kruskal" element={<Kruskal />} />
          <Route path="kruskal-anim" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
