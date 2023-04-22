import './Menu.css';
import Card from '../Card/Card';
import { Link, useParams } from 'react-router-dom';

function Menu ({ ListMenu }) {
  const { id } = useParams();
  return (
    <div className='Menu animated-element'>
      <div className='TitleGroup'>
        <h2 className='Menu-Title'>Menu</h2>
        <Link to={`/menu/${id}`}><button className='menuBtn'>Editar</button></Link>
        <div className='Decorator'></div>
      </div>
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
