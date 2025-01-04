import React from 'react';
import './App.css';
import { Route, Routes, HashRouter, Navigate } from 'react-router-dom';
import ProductsList from './components/productList/ProductsList';
import ProductDetail from './components/productDetail/ProductDetail';
import ProductForm from './components/productForm/ProductForm';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="create-product" element={<ProductForm />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
