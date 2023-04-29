import { useState, useEffect } from 'react';
import { useUploadImage } from './useUploadImage';

export const useDishForm = (initialValues, validate) => {
  const [formValues, setFormValues] = useState(initialValues);
  const { image, loading, handleChangeimage } = useUploadImage();
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    setErrors(validate({ ...formValues, [name]: value }));
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

    setErrors(validate({ ...formValues, [name]: value }));
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
