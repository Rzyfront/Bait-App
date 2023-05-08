import { Input, Textarea, Loading } from '@nextui-org/react';
import '../DishForm.css';
import { RiImageAddFill } from 'react-icons/ri';

const Inputs = ({ formValues, errors, image, loading, handleChange, handleSelect, handleChangeImages }) => {
  return (
        <>
            <div className='formValues-form-column'>
                    <Input
                        underlined
                        labelPlaceholder="Nombre producto"
                        color="dark"
                        className='name'
                        onChange={handleChange}
                        value={formValues?.name}
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
                        value={formValues?.type}
                        required
                    >
                        <option value='value2' defaultValue>Tipo</option>
                        <option value='glutenFree'>Gluten free</option>
                        <option value='Apto para diabéticos'>Apto para diabéticos</option>
                        <option value='Vegano'>Vegano</option>
                        <option value='Fitness'>fitness</option>
                        <option value='Vegetariano'>Vegano</option>
                        <option value='No aplica'>No aplica</option>
                    </select>
            </div>
      <div className='formValues-form-column'>
                    <Input
                        underlined
                        labelPlaceholder="Price USD"
                        color="dark"
                        className='type'
                        onChange={handleChange}
                        value={formValues?.price}
                        type='number'
                        name='price'
                        required
                    />
                    {errors.price && <span>{errors.price}</span>}
                    <Textarea
                        underlined
                        labelPlaceholder="Descripción"
                        color="dark"
                        className='type textArea-Dish'
                        onChange={handleChange}
                        value={formValues?.description}
                        type='text'
                        name='description'
                        required
                    />
      </div>
      <div className='formValues-form-column Img-Input-Ouput'>
                    {errors.description && <span>{errors.description}</span>}
                    {image?.url
                      ? <label htmlFor="Input-Dish" className='Input-Dish-Label'>
                      <h5 className='addPhoto'>Actualizar foto</h5>
                      {loading
                        ? <Loading color="primary" />
                        : <img src={image.url} alt='dish' className='Dish-Photo' />}
                      <input
                        id='Input-Dish'
                        className='Input-File-Dish'
                        type='file'
                        name='image'
                        accept='image/png,image/jpeg,image/jpg,image/gif'
                        onChange={handleChangeImages}
                    ></input>
                    </label>
                      : loading === true
                        ? (
                        <Loading color="primary" />
                          )
                        : <label htmlFor="Input-Dish" className='Input-Dish-Label'>
                     <input
                        id='Input-Dish'
                        className='Input-File-Dish'
                        type='file'
                        name='image'
                        accept='image/png,image/jpeg,image/jpg,image/gif'
                        onChange={handleChangeImages}
                    ></input>
                        <h5 className='addPhoto'>Agregar foto</h5>
                          <RiImageAddFill className='LocalesImage' />

                    </label>
                    }
      </div>
        </>
  );
};

export default Inputs;
