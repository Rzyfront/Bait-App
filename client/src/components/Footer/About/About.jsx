import BaitLogo from '../../../assets/LogoBait.svg';
import { Link } from 'react-router-dom';
import './About.css';

function About () {
  return (
    <div className='About-Component animated-element'>
        <div className='About-Container'>
          <Link to='/home'>
            <img src={BaitLogo} alt='Bait_Logo' className='BaitLogo'/>
          </Link>

            <h2 className='Title'>Sobre <span>Bait</span></h2>

            <p>¡Bienvenidos a Bait! Somos una plataforma que conecta a los usuarios con restaurantes y locales gastronómicos de su ciudad. En Bait, los usuarios pueden ver información detallada sobre los locales, como menús, precios y reseñas, y pueden reservar sin costo alguno desde nuestra página web.</p>

            <p>Actualmente no contamos con aplicación móvil, esperamos próximamente tenerla lista para todos nuestros usuarios, pero puedes acceder a nuestra página web en https://bait-one.vercel.app para explorar la amplia variedad de opciones gastronómicas disponibles en tu ciudad.</p>

           <p> En Bait, nuestra misión es hacer que la búsqueda de restaurantes sea lo más fácil y accesible posible para nuestros usuarios. Queremos que puedan encontrar los mejores lugares para comer y disfrutar de experiencias gastronómicas memorables.</p>

           <Link to='/home'>
            <button>Volver</button>
          </Link>
        </div>
    </div>
  );
}

export default About;
