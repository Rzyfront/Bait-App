import './Menu.css';
import Card from '../Card/Card';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function Menu ({ ListMenu }) {
  const { id } = useParams();
  const [edit, setEdit] = useState(false);

  const handleSelectChange = (e) => {
    const { value } = e.target;

    if (value === 'agregar') {
      window.open(`/menu/${id}`, '_blank');
    } else if (value === 'editar') {
      setEdit(true);
    }
  };
  return (
    <div className='Menu animated-element'>
      <div className='TitleGroup'>
        <h2 className='Menu-Title'>Menú</h2>
        <div className='Decorator'></div>
      </div>

      <select defaultValue="default" onChange={handleSelectChange}>
        <option value="default" disabled>Actualizar</option>
        <option value="editar">Editar</option>
        <option value="agregar">Agregar</option>
      </select>

      <div className='Menu-List'>
        {ListMenu.map(({ name, Images, Price, Rating }, index) => {
          return (
            <Card
              key={index}
              name={name}
              Images={Images}
              Price={Price}
              Rating={Rating}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
