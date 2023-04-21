import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postDish } from '../../../redux/actions/actions';

const DishForm = () => {
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
    dispatch(postDish(dish));
  };
  return (
        <div>
            <form onSubmit={handleSubmit}>
              <Input
                  underlined
                  labelPlaceholder="Nombre del plato o bebida"
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
              <Input
                  underlined
                  labelPlaceholder="Price"
                  color="dark"
                  className='type'
                  onChange={handleChange}
                  value={dish.price}
                  type='number'
                  name='proce'
                  required
              />
            <button type={handleSubmit}>Agregar producto</button>
            </form>
        </div>
  );
};

export default DishForm;
