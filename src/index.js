import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetailPokemonPage from './pages/DetailPokemonPage';
import PublicLayout from 'layout/PublicLayout';


const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<h1>Autora: Selena Jimenez</h1>} />
          <Route path="/detail/:id" element={<DetailPokemonPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement,
);
