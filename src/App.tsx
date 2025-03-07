import React from 'react';
import Navbar from './components/Navbar.tsx'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './Layout/Layout.tsx';
import Stores from './pages/Stores.tsx';
import Sku from './pages/Sku.tsx';
import Planning from './pages/Planning.tsx';
import Chart from './pages/Chart.tsx';
import Sidebar from './components/Sidebar.tsx';
import HomePage from './pages/HomePage.tsx';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/stores' element={<Stores />} />
          <Route path='/sku' element={<Sku />} />
          <Route path='/planning' element={<Planning />} />
          <Route path='/chart' element={<Chart />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App