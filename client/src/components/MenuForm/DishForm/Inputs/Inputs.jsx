import { Input, Textarea } from '@nextui-org/react';

const Inputs = ({ handleChange, handleChangeimages, handleSelect, dish }) => {
  return (
        <>
            <div className='Dish-Form-Container'>

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
                    <input
                        type='file'
                        name='image'
                        accept='image/png,image/jpeg,image/jpg,image/gif'
                        onChange={handleChangeimages}
                    ></input>
                </div>
            </div>
        </>
  );
};

export default Inputs;
