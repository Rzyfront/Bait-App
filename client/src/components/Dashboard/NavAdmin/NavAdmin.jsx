import style from './NavAdmin.module.css';
import LogoBait from '../../../assets/LogoBait.svg';
import { FaUserFriends } from 'react-icons/fa';
import { MdOutlineRestaurantMenu, MdReviews } from 'react-icons/md';
import { BiExit } from 'react-icons/bi';
import { useNavigate, Link } from 'react-router-dom';

const NavAdmin = ({ fn, section }) => {
  const navigate = useNavigate();

  return (
    <nav className={style.nav}>
      <div className={style.profile}>
        <Link to='/home/1?name=&city='>
          <img src={LogoBait} className={style.img}></img>
        </Link>
        <p className={style.username}>ADMINISTRACIÓN</p>
      </div>
      <ul className={style.ul}>
        <li className={section === 0 ? style.liSelected : style.li} onClick={() => fn(0)}><b><FaUserFriends /></b><span>Usuarios</span></li>
        <li className={section === 1 ? style.liSelected : style.li} onClick={() => fn(1)}><b><MdOutlineRestaurantMenu /></b><span>Restaurantes</span></li>
        <li className={section === 2 ? style.liSelected : style.li} onClick={() => fn(2)}><b><MdReviews /></b><span>Reseñas</span></li>
        <li className={style.li} onClick={() => navigate('/')}><b><BiExit /></b><span>Salir</span></li>
      </ul>
    </nav>
  );
};

export default NavAdmin;
