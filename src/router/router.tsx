import { createBrowserRouter } from 'react-router-dom';
import ProductsList from '../components/productList/ProductsList';
import ProductDetail from '../components/productDetail/ProductDetail';
import ProductForm from '../components/productForm/ProductForm';

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
    {
      path: 'create-product',
      element: <ProductForm />,
    },
  ],
  { future: { v7_startTransition: true } }
);
