import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { useUploadImage } from '../../../hooks/useUploadImage';
import './DishForm.css';
import validateForm from './dishVal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postDish, putDish } from '../../../redux/actions/menuDish';
import Inputs from './Inputs/Inputs';
import { useParams } from 'react-router-dom';

const DishForm = ({ menuId }) => {
  const { dishId } = useParams();
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
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDish({
      ...dish,
      [name]: value
    });
    setErrors(validateForm({
      ...dish,
      [name]: value
    }));
  };
  const handleSelect = (event) => {
    const { name, value } = event.target;
    setDish({
      ...dish,
      [name]: value
    });
    setErrors(validateForm({
      ...dish,
      [name]: value
    }));
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
    if (!Object.entries(errors).length) {
      if (!image.length) return swal('Falta una imagen', 'Adjúntala');
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
    } else {
      swal('Datos incompletos o con errores');
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(putDish(dishId, dish)).then(() => {
      toast.success('Producto actualizado con éxito.', {
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
      toast.error('Error al actualizar', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    });
  };

  return (
  <>
      <ToastContainer />
      <div className='Create-dish-Form animated-element'>
        <div className='dishes_data animated-element'>
         { title ? <h2>Agrega otro producto</h2> : <h2>Agrega un producto</h2 >}
          <div className='dish-form-container'>
          <Inputs
            handleChange={handleChange}
            handleChangeimages={handleChangeimages}
            handleSelect={handleSelect}
            dish={dish}
            image={image}
            dishId={dishId}
            errors={errors}
          />
      {
        dishId
          ? <button onClick={handleUpdate} className='btnDish' type='submit'>Actualizar</button>
          : <button onClick={handleSubmit} className='btnDish' type='submit'>Agregar</button>
      }
          </div>
      </div>
    </div>
  </>
  );
};

export default DishForm;
