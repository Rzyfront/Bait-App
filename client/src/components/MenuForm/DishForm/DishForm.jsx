import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useUploadImage } from '../../../hooks/useUploadImage';
import './DishForm.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postDish } from '../../../redux/actions/actions';
import Inputs from './Inputs/Inputs';

const DishForm = ({ menuId }) => {
  const { image, loading, handleChangeimage } = useUploadImage();
  const dispatch = useDispatch();
  const [title, setTile] = useState(false);
  const [dish, setDish] = useState({
    name: '',
    type: '',
    ingredients: '',
    price: '',
    description: ''
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDish({
      ...dish,
      [name]: value
    });
  };
  const handleSelect = (event) => {
    const { name, value } = event.target;
    setDish({
      ...dish,
      [name]: value
    });
  };

  const handleChangeimages = (event) => {
    handleChangeimage(event);
  };

  useEffect(() => {
    if (image.length) {
      setDish({ ...dish, image: image[0] });
    }
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDish(menuId, dish)).then(() => {
      toast.success('Producto agregado', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      setDish({
        name: '',
        type: '',
        ingredients: '',
        price: '',
        description: ''
      });
      setTile(true);
    }).catch(() => {
      toast.error('Error al agregar', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    });
  };

  return (
    <>
      <ToastContainer />
      { title ? <h2>Agrega otro producto</h2> : <h2>Agrega un producto</h2 >
}
            <Inputs
              handleChange={handleChange}
              handleChangeimages={handleChangeimages}
              handleSelect={handleSelect}
              dish={dish}
            image={image}
            />
            <button onClick={handleSubmit} className='btnDish' type='submit'>Agregar</button>
        </>
  );
};

export default DishForm;
