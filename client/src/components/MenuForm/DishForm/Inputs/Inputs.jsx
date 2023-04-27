import { Input, Textarea } from '@nextui-org/react';
import '../DishForm.css';

const Inputs = ({ handleChange, handleChangeimages, handleSelect, dish, errors, image, dishId, menu }) => {
  const findDish = (dishId) => {
    if (dishId) {
      const updDish = menu?.map(menu => {
        return menu?.Dishes.find(dish => dish.id === dishId);
      });
      console.log('hola', updDish);
    }
  };

  return (
        <>
            {
                dishId && findDish(dishId)
            }
            <div className='dish-form-column'>
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
                    {errors.name && <span className='danger'>{errors.name}</span>}
                    {errors.type && <span className='danger'>{errors.type}</span>}

                    <select
                        name='type'
                        className='type'
                        onChange={handleSelect}
                        value={dish.type}
                        required
                    >
                        <option value='value2' defaultValue>Tipo</option>
                        <option value='comun'>Común</option>
                        <option value='glutenFree'>Gluten free</option>
                        <option value='diabetic'>Apto para diabéticos</option>
                        <option value='vegan'>Vegano</option>
                        <option value='fitness'>fitness</option>
                        <option value='na'>No aplica</option>
                    </select>
            </div>
      <div className='dish-form-column'>
                    <Input
                        underlined
                        labelPlaceholder="Price USD"
                        color="dark"
                        className='type'
                        onChange={handleChange}
                        value={dish.price}
                        type='number'
                        name='price'
                        required
                    />
                    {errors.price && <span>{errors.price}</span>}
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
      <div className='dish-form-column'>
                    {errors.description && <span>{errors.description}</span>}
                    <input
                        type='file'
                        name='image'
                        accept='image/png,image/jpeg,image/jpg,image/gif'
                        onChange={handleChangeimages}
                    ></input>
                    {image.length
                      ? <img src={image[image.length - 1].url} alt="foto" className='photosize' />
                      : <img src='https://res.cloudinary.com/dirsusbyy/image/upload/v1680389194/ppex43qn0ykjyejn1amk.png' alt="photo default"
                          className='photosize'

                      />
                    }
      </div>
        </>
  );
};

export default Inputs;
