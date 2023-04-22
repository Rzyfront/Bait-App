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
  const { id } = useParams();
  const dispatch = useDispatch();
  const { successMenu, newMenu } = useSelector(state => state);
  const [showDish, setShowDish] = useState(false);

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

    if (menu.type !== '') {
      dispatch(postMenu(id, menu)).then(() => {
        toast.success('Se agregó la sección', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        });
        setShowDish(true);
      }).catch(() => {
        toast.error('Falló al crear', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        });
      });
    }
  };

  useEffect(() => {
    if (successMenu) {
      setShowDish(true);
    }
  }, [successMenu]);

  return (
        <div className='Menu-Form-Container'>
          <ToastContainer />
          { !successMenu && (
            <>
              <h2>Agrega una sección</h2>
              <form className='Menu-Form'>
                <label>Sección</label>
                <select
                  name='type'
                  className='type'
                  onChange={handleSelect}
                  value={menu.type}
                  required
                >
                  <option value='defaultValue' defaultValue>
                    Selecciona
                  </option>
                  {foodTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <button type='submit' onClick={handleSubmit}>Agregar</button>
          </form>
            </>
          )}
          {
           showDish && <DishForm menuId={newMenu?.id}/>
          }

        </div>
  );
};

export default MenuForm;
