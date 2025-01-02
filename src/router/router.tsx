import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProductsList from '../components/ProductsList';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/products" replace />,
    },
    {
      path: 'products',
      element: <ProductsList />,
    },
    // {
    //   path: 'products/:id',
    //   element: <ProductDetail />,
    // },
    // {
    //   path: 'create-product',
    //   element: <ProductForm />,
    // },
  ],
  { future: { v7_startTransition: true } }
);
