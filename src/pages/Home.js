import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Layout from '../components/Layout';
import Pagamentos from './pagamentos/Pagamentos';
import Saldos from './saldos/Saldos';

const Home = () => {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<h2>Selecione uma opção no menu lateral</h2>}
        />
        <Route path="/pagamentos" element={<Pagamentos />} />
        <Route path="/saldos" element={<Saldos />} />
      </Routes>
    </Layout>
  );
};

export default Home;
