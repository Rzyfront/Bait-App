import { useState } from 'react';
import { Input, Textarea } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import './DishForm.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postDish } from '../../../redux/actions/actions';

const DishForm = () => {
  const { menu } = useSelector(state => state);
  const { success, error } = useSelector(state => state);
  const dispatch = useDispatch();
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
      [name]: value
    });
  };
  const handleSelect = (event) => {
    const { name, value } = event.target;
    setDish({
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDish(menu.id, dish));
    success && toast.success('Se agregó el plato', {
      position: toast.POSITION.TOP_CENTER
    });
  };

  error && toast.error('Falló al crear el menu', {
    position: toast.POSITION.TOP_CENTER
  });
  return (
    <>
      <h2>Agrega un producto</h2>
    <div className='Dish-Form-Container'>
        <ToastContainer/>
        <div className='dishColumn'>
              <Input
                  underlined
                  labelPlaceholder="Nombre producto"
                  color="dark"
                  className='name'
                  onChange={handleChange}
                  value={dish.name}
                  type='text'
                  name='name'
                  required
              />
              {/* {errors.name && <p className='danger'>{errors.name}</p>} */}
                <select
                    name='type'
                    className='type'
                    onChange={handleSelect}
                    value={dish.type}
                    required
                >
                    <option value='value2' defaultValue>Selecciona</option>
                    <option value='comun'>Común</option>
                    <option value='glutenFree'>Gluten free</option>
                    <option value='diabetic'>Apto para diabéticos</option>
                    <option value='vegan'>Vegano</option>
                    <option value='fitness'>fitness</option>
                    <option value='na'>No aplica</option>
                </select>

              <Input
                  underlined
                  labelPlaceholder="Ingredients"
                  color="dark"
                  className='type'
                  onChange={handleChange}
                  value={dish.ingredients}
                  type='text'
                  name='ingredients'
                  required
              />
      </div>
      <div className='dishColumn'>
              <Input
                  underlined
                  labelPlaceholder="Price"
                  color="dark"
                  className='type'
                  onChange={handleChange}
                  value={dish.price}
                  type='number'
                  name='price'
                  required
              />
                <Textarea
                  underlined
                  labelPlaceholder="Descripción"
                  color="dark"
                  className='type'
                  onChange={handleChange}
                  value={dish.description}
                  type='text'
                  name='description'
                  required
              />
      </div>
        </div>
            <button onClick={handleSubmit} className='btnDish'>Agregar producto</button>
        </>
  );
};

export default DishForm;
