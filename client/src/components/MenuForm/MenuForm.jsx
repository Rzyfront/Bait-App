import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { foodTypes } from '../../helpers/foodTypes';
import { getMenu, postMenu } from '../../redux/actions/menuDish';
import DishForm from './DishForm/DishForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MenuForm.css';

const MenuForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { successMenu, newMenu, menu } = useSelector(state => state);
  const [menuData, setMenuData] = useState([]);
  const [showDish, setShowDish] = useState(false);
  console.log(menu);

  const [menuForm, setMenuForm] = useState({
    type: ''
  });
  const handleSelect = (event) => {
    const { name, value } = event.target;
    setMenuForm({
      [name]: value
    });
  };

  const isTypeAlreadyInMenu = (type) => {
    return menuData.some((section) => section.type === type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (menuForm.type !== '') {
      dispatch(postMenu(id, menuForm));
    } else {
      swal('Campo obligatorio', 'Selecciona la sección del menú.');
    }
  };
  useEffect(() => {
    if (!menuData.length) dispatch(getMenu(id));
    setMenuData(menu);
  }, [menu, successMenu]);

  useEffect(() => {
    if (successMenu) {
      setShowDish(true);
      toast.success('Se agregó la sección', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    }
  }, [successMenu]);

  return (
        <div className='Menu-Form-Container'>
          <ToastContainer />
          { !successMenu && (
            <>
              <h2>Nueva sección</h2>
              <form className='Menu-Form'>
                <select
                  name='type'
                  className='type'
                  onChange={handleSelect}
                  value={menuForm.type}
                  required
                >
                  <option value="defaultValue" defaultValue>
                    Selecciona
                  </option>
                  {foodTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                      disabled={isTypeAlreadyInMenu(type)}
                    >
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
