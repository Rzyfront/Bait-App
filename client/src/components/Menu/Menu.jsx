import './Menu.css';
import DishCard from '../Card/DishCard';
import swal from 'sweetalert';
// import Tooltip from './Tooltip/Tooltip';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getMenu, deleteDish, deleteMenu } from '../../redux/actions/menuDish';
import { FaEdit, FaTrash } from 'react-icons/fa';
import MenuForm from '../MenuForm/MenuForm';
import DishForm from '../MenuForm/DishForm/DishForm';

function Menu () {
  const [nomodal, modal1, modal2] = ['nomodal', 'modal1', 'modal2'];

  const { id } = useParams();
  const { menu, successDish, successDel, newMenu } = useSelector(state => state);
  const [toggleModal, setToggleModal] = useState(nomodal);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState('Editar');
  const [dishId, setDishId] = useState(null);

  const handleMenuChange = (e) => {
    const { name } = e.target;

    if (name === 'addMenu') {
      setToggleModal(modal1);
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
    setDishId(dishId);
    setToggleModal(modal2);
  };

  const editMenu = (menuId) => {
    window.open(`/updateMenu/${id}/${menuId}`, '_blank');
  };
  console.log(menu);

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
          dispatch(deleteMenu(menuId)).then((res) => {
            if (!res) {
              swal('¡Sección eliminada con éxito!', {
                icon: 'success'
              });
            } else {
              swal('Acción cancelada');
            }
          });
        }
      });
  };

  useEffect(() => {
    dispatch(getMenu(id));
  }, [successDel, successDish]);

  return (
    <div className='Menu'>
      <div className='Menu-TitleGroup'>
        <div>
          <h2 className='Menu-Title'>Menú</h2>
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
                  {edit && (
                    <div>
                      {/* <Tooltip text={'Agregar productos'}> */}
                        <p onClick={() => editMenu(section.id)} className='iconsDishCard'>
                          <FaEdit className='edit-icon' />
                        </p>
                      {/* </Tooltip> */}
                      {/* <Tooltip text={'Eliminar'}> */}
                        <p onClick={() => delMenu(section.id)} className='iconsDishCard'>
                          <FaTrash className='delete-icon' />
                        </p>
                      {/* </Tooltip> */}
                    </div>
                  )}
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
      {(toggleModal === modal1) && <MenuForm localId={id} modal2={modal2} setToggleModal={setToggleModal} />}
      {(toggleModal === modal2) && <DishForm nomodal={nomodal} setToggleModal={setToggleModal} menuId={newMenu.id} dishId={dishId}/>}
    </div>
  );
}

export default Menu;
