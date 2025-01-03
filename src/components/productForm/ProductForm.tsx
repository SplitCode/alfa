import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/productsSlice';
import { useNavigate } from 'react-router-dom';
import BackButton from '../shared/BackButton/BackButton';
import ProductSchema from './ValidationSchema';
import './ProductForm.css';

const ProductForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    image: '',
    description: '',
    category: '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(
      addProduct({
        ...values,
        id: Date.now(),
        liked: false,
      })
    );
    navigate('/products');
  };

  return (
    <div className="form-container">
      <BackButton to="/products" />
      <Formik
        initialValues={initialValues}
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="product-form">
            <h1 className="product-form-title">Create Product</h1>

            <div className="form-group">
              <Field
                className="form-input"
                type="text"
                name="title"
                placeholder="Title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="form-error"
              />
            </div>

            <div className="form-group">
              <Field
                className="form-input"
                type="url"
                name="image"
                placeholder="Image URL"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="form-error"
              />
            </div>

            <div className="form-group">
              <Field
                className="form-textarea"
                as="textarea"
                name="description"
                placeholder="Description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="form-error"
              />
            </div>

            <div className="form-group">
              <Field
                className="form-input"
                type="text"
                name="category"
                placeholder="Category"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="form-error"
              />
            </div>

            <button
              className="submit-button"
              type="submit"
              disabled={!isValid || !dirty || isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
