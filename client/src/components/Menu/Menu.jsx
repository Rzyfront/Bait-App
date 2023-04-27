import './Menu.css';
import DishCard from '../Card/DishCard';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getMenu, deleteDish, deleteMenu } from '../../redux/actions/menuDish';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Menu () {
  const { id } = useParams();
  const { menu, successDish, successDel } = useSelector(state => state);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState('Editar');

  const handleMenuChange = (e) => {
    const { name } = e.target;

    if (name === 'addMenu') {
      window.open(`/menu/${id}`, '_blank');
    } else if (name === 'editMenu') {
      setEdit(!edit);
      setEditText(edit ? 'Editar' : 'Finalizar edición');
    }
  };

  const delDish = (dishId) => {
    swal({
      title: '¿Está seguro(a)',
      text: 'Una vez borrado no podrás deshacer esta acción',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteDish(dishId));
          if (successDish) {
            swal('¡Producto eliminado con éxito!', {
              icon: 'success'
            });
          }
        } else {
          swal('Acción cancelada');
        }
      });
  };

  const reqPutDish = (dishId) => {
    window.open(`/updateDish/${dishId}`, '_blank');
  };

  const editMenu = (menuId) => {
    window.open(`/updateMenu/${menuId}`, '_blank');
  };

  const delMenu = (menuId) => {
    swal({
      title: '¿Está seguro(a)',
      text: 'Una vez borrado no podrás deshacer esta acción',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteMenu(menuId));
          if (successDel) {
            swal('¡Producto eliminado con éxito!', {
              icon: 'success'
            });
          }
        } else {
          swal('Acción cancelada');
        }
      });
  };

  useEffect(() => {
    dispatch(getMenu(id));
  }, [successDel]);

  return (
    <div className="Menu">
      <div className="Menu-TitleGroup">
        <div>
          <h2 className="Menu-Title">Menú</h2>
          <div className="Decorator"></div>
        </div>
        <div className='buttons-menu'>
          <button className='btn-edit-menu' name='editMenu' onClick={handleMenuChange}>{editText}</button>
          <button className='btn-add-sect' name='addMenu' onClick={handleMenuChange}>Nueva sección</button>
        </div>
      </div>

      <div className='Menu-List'>
        {menu && (
          menu.map((section, index) => {
            return (
              <div className='section-menu' key={index}>
                {<div className='section-menu-title'>
                  <h4 key={index} className='section-title'>{section.type}</h4>
                  {edit && <div>
                     <p onClick={() => editMenu(section.id)} className='iconsDishCard'>
                        <FaEdit className='edit-icon' />
                    </p>
                    <p onClick={() => delMenu(section.id)} className='iconsDishCard'>
                        <FaTrash className='delete-icon' />
                    </p>
                  </div>}
                </div>}
                <div className='menu-cards-container'>
                {section.Dishes?.map(({ id, type, name, Image, price, description }, subIndex) => {
                  return (
                    <DishCard
                      key={subIndex}
                      id={id}
                      type={type}
                      name={name}
                      image={Image}
                      price={price}
                      description={description}
                      delDish={delDish}
                      editDish={reqPutDish}
                      edit={edit}
                    />
                  );
                })
                }
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Menu;
