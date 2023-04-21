import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { foodTypes } from '../../helpers/foodTypes';
import { postMenu } from '../../redux/actions/actions';
import DishForm from './DishForm/DishForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MenuForm.css';

const MenuForm = () => {
  const { localId } = useParams();
  const dispatch = useDispatch();
  const { success, error } = useSelector(state => state);
  const [showDish, setShowDish] = useState(true);
  success && setShowDish(true);
  success && toast.success('Se agregó la sección', {
    position: toast.POSITION.TOP_CENTER
  });

  error && toast.error('Falló al crear el menu', {
    position: toast.POSITION.TOP_CENTER
  });
  const [menu, setMenu] = useState({
    type: ''
  });
  const handleSelect = (event) => {
    const { name, value } = event.target;
    setMenu({
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(menu);
    if (menu.type !== '') {
      dispatch(postMenu(1, menu));
    }
  };
  useEffect({

  });

  return (
        <div className='Menu-Form-Container'>
          <ToastContainer />
          <h2>Agrega tu menú</h2>
            <form className='Menu-Form'>
              <label>Sección</label>
              <select
                  name='type'
                  className='type'
                  onChange={handleSelect}
                  value={menu.type}
                  required
              >
                  <option value='value2' defaultValue>
                      Selecciona
                  </option>
                  {foodTypes.map(type => (
                      <option key={type} value={type}>
                          {type}
                      </option>
                  ))}
              </select>
              <button type='submit' onClick={handleSubmit}>Agregar</button>
              {/* {
                showDish && <DishForm/>
              } */}
            </form>
        </div>
  );
};

export default MenuForm;
