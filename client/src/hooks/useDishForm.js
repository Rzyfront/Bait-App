import { useState, useEffect } from 'react';
import { useUploadImage } from './useUploadImage';

export const useDishForm = (initialValues, validate) => {
  const [formValues, setFormValues] = useState(initialValues);
  const { image, loading, handleChangeimage } = useUploadImage();
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
    const validationErrors = validate({ ...formValues, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationErrors[name] }));
  };
  const handleChangeImages = (event) => {
    handleChangeimage(event);
  };

  useEffect(() => {
    if (image.length) {
      setFormValues(prevValues => ({ ...prevValues, image: image[0] }));
      setErrors(prevErrors => ({ ...prevErrors, image: undefined }));
    }
  }, [image]);

  const handleSelect = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));

    const validationErrors = validate({ ...formValues, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationErrors[name] }));
  };
  console.log(errors);
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
