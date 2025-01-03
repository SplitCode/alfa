import * as Yup from 'yup';

const ProductSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title cannot exceed 50 characters')
    .required('Required field'),
  image: Yup.string().url('Must be a valid URL').required('Required field'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Required field'),
  category: Yup.string()
    .min(3, 'Category must be at least 3 characters')
    .required('Required field'),
});

export default ProductSchema;
