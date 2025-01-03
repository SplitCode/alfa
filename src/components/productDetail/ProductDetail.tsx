import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../shared/BackButton/BackButton';
import {
  fetchProducts,
  selectCombinedProducts,
} from '../../store/productsSlice';
import { AppDispatch } from '../../store/store';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectCombinedProducts);
  const product = products.find((product) => product.id === Number(id));

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <BackButton to="/products" />
      <div className="product-card">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.title}
        />
        <div className="product-card__info">
          <h1 className="product-card__title">{product.title}</h1>
          <p className="product-card__description">{product.description}</p>
          <p className="product-card__category">Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
