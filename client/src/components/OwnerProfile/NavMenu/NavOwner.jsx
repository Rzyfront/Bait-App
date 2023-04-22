import style from './Owner.css';
import LogoBait from '../../../assets/LogoBait.svg';
import { FaUserFriends } from 'react-icons/fa';
import { MdOutlineRestaurantMenu, MdReviews } from 'react-icons/md';
import { BiExit } from 'react-icons/bi';
import { useNavigate, Link } from 'react-router-dom';

const NavOwner = ({ fn, section }) => {
  const navigate = useNavigate();

  return (
        <nav className={style.nav}>
            <div className={style.profile}>
                <Link to='/home/1?name=&city='>
                    <img src={LogoBait} className={style.img}/>
                </Link>
                <h2 className={style.username}>{user.name}</h2>
            </div>
            <ul className={style.ul}>
                <li className={section === 0 ? style.liSelected : style.li} onClick={() => fn(0)}><FaUserFriends /><span>Actualizar datos</span></li>
              <li className={section === 0 ? style.liSelected : style.li} onClick={() => fn(0)}><FaUserFriends /><span>Mis locales</span></li>
                <li className={style.li} onClick={() => navigate('/')}><BiExit /><span>Salir</span></li>
            </ul>
        </nav>
  );
};

export default NavOwner;
