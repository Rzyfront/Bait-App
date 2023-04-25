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
  const { menu, successDish } = useSelector(state => state);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const handleSelectChange = (e) => {
    const { value } = e.target;

    if (value === 'agregar') {
      window.open(`/menu/${id}`, '_blank');
    } else if (value === 'editar') {
      setEdit(true);
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
    window.open(`/menu/${menuId}`, '_blank');
  };

  const delMenu = (menuId) => {
    dispatch(deleteMenu(menuId));
  };

  useEffect(() => {
    if (successDish) dispatch(getMenu(id));
  }, [successDish, menu]);

  return (
    <div className="Menu">
      <div className="TitleGroup">
        <h2 className="Menu-Title">Menu</h2>
        <div className="Decorator"></div>
      </div>

      <select defaultValue="default" onChange={handleSelectChange}>
        <option value="default" disabled>Actualizar</option>
        <option value="editar">Editar</option>
        <option value="agregar">Agregar</option>
      </select>

      <div className='Menu-List'>
        {menu && (
          menu.map((section, index) => {
            return (
              <>
                {<div>
                  {edit && <><p onClick={() => delMenu(id)} className='iconsDishCard'>
                    <FaTrash className='delete-icon' />
                    </p>
                     <p onClick={() => editMenu(id)} className='iconsDishCard'>
                    <FaEdit className='edit-icon' />
                    </p></>}
                  <h4 key={index} className='section-title'>{section.type}</h4>
                </div>}
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
              </>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Menu;
