import { createBrowserRouter } from 'react-router-dom';
import ProductsList from '../components/ProductsList';
import ProductDetail from '../components/ProductDetail';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <ProductsList />,
    },
    {
      path: 'products',
      element: <ProductsList />,
    },
    {
      path: 'products/:id',
      element: <ProductDetail />,
    },
    // {
    //   path: 'create-product',
    //   element: <ProductForm />,
    // },
  ],
  { future: { v7_startTransition: true } }
);
