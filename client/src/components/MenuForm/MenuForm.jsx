import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { foodTypes } from '../../helpers/foodTypes';
import { getMenu, postMenu } from '../../redux/actions/menuDish';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MenuForm.css';

const MenuForm = ({ modal2, setToggleModal }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { menu, successMenu } = useSelector(state => state);
  const [menuData, setMenuData] = useState([]);
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
    console.log(e.target);
    if (menuForm.type !== '') {
      dispatch(postMenu(id, menuForm)).then(() => {
        toast.success('Se agregó la sección', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        });
      }).then(setToggleModal(modal2));
    } else if (!menuForm.type) {
      return swal('Selecciona una opción');
    }
  };

  useEffect(() => {
    if (!menuData.length) dispatch(getMenu(id));
    setMenuData(menu);
  }, []);

  return (
        <div className='Menu-Form-Container'>
          <ToastContainer />
          <div className='Menu-Form'>
              <h2>Nueva sección</h2>
              <form>
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
          </div>
        </div>
  );
};

export default MenuForm;
