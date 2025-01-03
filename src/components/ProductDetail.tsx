import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) =>
    [...state.products.localProducts, ...state.products.products].find(
      (product) => product.id === parseInt(id || '', 10)
    )
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <button onClick={() => navigate('/products')}>⬅ Back to Products</button>
      <h1>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '300px', height: '300px' }}
      />
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetail;
