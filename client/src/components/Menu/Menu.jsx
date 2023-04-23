import './Menu.css';
import DishCard from '../Card/DishCard';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getMenu, deleteDish } from '../../redux/actions/actions';

function Menu () {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { menu } = useSelector(state => state);
  const [edit, setEdit] = useState(false);

  const handleSelectChange = (e) => {
    const { value } = e.target;

    if (value === 'agregar') {
      window.open(`/menu/${id}`, '_blank');
    } else if (value === 'editar') {
      setEdit(true);
    }
  };

  const onClose = () => {
    swal({
      title: '¿Está seguro(a)',
      text: 'Una vez borrado no podrás deshacer esta acción',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteDish(id));
          swal('¡Producto eliminado con éxito!', {
            icon: 'success'
          });
        } else {
          swal('Acción cancelada');
        }
      });
  };

  useEffect(() => {
    dispatch(getMenu(id));
  }, []);

  return (
    <div className='Menu animated-element'>
      <div className='TitleGroup'>
        <h2 className='Menu-Title'>Menú</h2>
        <div className='Decorator'></div>
      </div>

      <select defaultValue='default' onChange={handleSelectChange}>
        <option value='default' disabled>Actualizar</option>
        <option value='editar'>Editar</option>
        <option value='agregar'>Agregar</option>
      </select>

      <div className='Menu-List'>
        {menu && (
          menu.map((section, index) => {
            return (
              <>
                {<h3 key={index}>{section.type}</h3>}
                {section.Dishes.map(({ id, type, name, Image, price, description }, subIndex) => {
                  return (
                      <DishCard
                        key={subIndex}
                        id={id}
                        type={type}
                        name={name}
                        image={Image}
                        price={price}
                        description={description}
                        onClose={onClose}
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
