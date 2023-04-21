import style from './NavAdmin.module.css';
import LogoBait from '../../../assets/LogoBait.svg';
import { FaUserFriends } from 'react-icons/fa';
import { MdOutlineRestaurantMenu, MdReviews } from 'react-icons/md';
import { BiExit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const NavAdmin = ({ fn, section }) => {
  const navigate = useNavigate();

  return (
    <nav className={style.nav}>
        <div className={style.profile}>
            <img src={LogoBait} className={style.img}></img>
            <p className={style.username}>ADMINISTRACION</p>
        </div>
        <ul className={style.ul}>
            <li className={section === 0 ? style.liSelected : style.li} onClick={() => fn(0)}><FaUserFriends/><span>Usuarios</span></li>
            <li className={section === 1 ? style.liSelected : style.li} onClick={() => fn(1)}><MdOutlineRestaurantMenu/><span>Restaurantes</span></li>
            <li className={section === 2 ? style.liSelected : style.li} onClick={() => fn(2)}><MdReviews/><span>Reseñas</span></li>
            <li className={style.li} onClick={() => navigate('/')}><BiExit/><span>Salir</span></li>
        </ul>
    </nav>
  );
};

export default NavAdmin;
