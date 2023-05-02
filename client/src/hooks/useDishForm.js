import { useState, useEffect } from 'react';
import { useUploadImage } from './useUploadImage';
import { getDish } from '../redux/actions/menuDish';

const initialValues = {
  name: '',
  type: '',
  price: '',
  description: '',
  image: {}
};

export const useDishForm = ({ validateForm, dishId }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const { image, loading, handleChangeimage } = useUploadImage();
  const [errors, setErrors] = useState({});

  const haveDish = async () => {
    const res = await getDish(dishId);
    setFormValues(res);
  };

  useEffect(() => {
    if (dishId) {
      haveDish();
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    setErrors(validateForm({ ...formValues, [name]: value }));
  };
  const handleChangeImages = (event) => {
    handleChangeimage(event);
  };

  useEffect(() => {
    if (image.length) {
      setFormValues({ ...formValues, image: image[0] });
    }
  }, [image]);

  const handleSelect = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });

    setErrors(validateForm({ ...formValues, [name]: value }));
  };

  const resetForm = () => {
    setFormValues(initialValues);
    setErrors({});
  };

  return {
    formValues,
    setFormValues,
    errors,
    handleInputChange,
    handleSelect,
    resetForm,
    handleChangeImages,
    loading,
    image
  };
};
