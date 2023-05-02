import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { MdClose } from 'react-icons/md';
import { useDishForm } from '../../../hooks/useDishForm';
import './DishForm.css';
import validateForm from './dishVal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMenu, postDish, putDish } from '../../../redux/actions/menuDish';
import Inputs from './Inputs/Inputs';
import { useParams } from 'react-router-dom';

const DishForm = ({ menuId, newMenuId, nomodal, setToggleModal, dishId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { formValues, errors, handleInputChange, handleSelect, resetForm, loading, handleChangeImages, image } = useDishForm({ validateForm, dishId });

  menuId || (menuId = newMenuId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.entries(errors).length) {
      dispatch(postDish(menuId, formValues)).then(() => {
        toast.success('Producto agregado', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        });
        resetForm();
        dispatch(getMenu(id));
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
    dispatch(putDish(dishId, formValues)).then(() => {
      toast.success('Producto actualizado con éxito.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      resetForm();
      dispatch(getMenu(id));
    }).catch(() => {
      toast.error('Error al actualizar', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    });
  };

  useEffect(() => {
    dispatch(getMenu(id));
  }, [dispatch, id]);

  return (
  <>
      <ToastContainer />
      <div className='Create-dish-Form animated-element'>
       <div className='Create-dish-Modal'>
         <MdClose className='Close-dish-form-button' onClick={() => setToggleModal(nomodal)}/>
        <div className='dishes_data animated-element'>
          {
            menuId
              ? <h2 className='Dish-Title'>Agregar un nuevo producto</h2>
              : <h2 className='Dish-Title'>Actualizar producto</h2>
          }
          <div className='dish-form-container'>
          <Inputs
            handleChange={handleInputChange}
            handleChangeImages={handleChangeImages}
            handleSelect={handleSelect}
            formValues = {formValues}
            image={image[image.length - 1] || formValues.image}
            errors={errors}
            loading={loading}
          />
          </div>
      {
        menuId
          ? <button onClick={handleSubmit} className='btnDish' type='submit'>Agregar</button>
          : <button onClick={handleUpdate} className='btnDish' type='submit'>Actualizar</button>
      }
      </div>
       </div>
    </div>
  </>
  );
};

export default DishForm;
