import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import BackButton from '../shared/BackButton/BackButton';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
      <BackButton to="/products" />
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
