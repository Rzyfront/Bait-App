import { useState } from 'react';
import '../../Navbar/Navbar.css';
import BaitLogo from '../../../assets/LogoBait.svg';
import BaitLogoSmall from '../../../assets/LogoBaitSmall.svg';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ResetUser } from '../../../redux/actions/actions';
import Login from '../../Login/Login';
import DropdownUser from '../../Navbar/DropdownUser/DropdownUser';
import SearchHomeReview from './SearchHomeReview/SearchHomeReview';
const NavbarReview = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user);
  const [toggleMenuUser, setToggleMenuUser] = useState(false);
  const [toogleLogin, setToggleLogin] = useState(false);
  const ubication = useSelector((state) => state.ubication);

  const close = () => {
    localStorage.clear();
    dispatch(ResetUser());
  };

  return (
    <div id='Navbar' className="all_navbar animated-element">
      {toogleLogin && <Login setToggleLogin={setToggleLogin} />}
      <Link to={`${location.pathname !== '/' ? '/' : `/writeAReview/1?name=&city=${ubication.city}`}`}>
        <img
          src={BaitLogo}
          alt="Bait"
          className="Logo"
        />
        <img
          src={BaitLogoSmall}
          alt="Bait"
          className="Logo-Small"
        />
      </Link>

      <SearchHomeReview />

      <div className="UserGroup">
        {JSON.stringify(dataUser) === '{}'
          ? (
            <div
              className="nav_login LogInGroup"
              onClick={() => {
                setToggleLogin(true);
              }}
            >
              <FaUserCircle className="UserIcon" />
              <h4 className="LogIn">Ingresar</h4>
            </div>
            )
          : (
            <div className="nav_login" onClick={toggleMenuUser
              ? () => {
                  setToggleMenuUser(false);
                }
              : () => {
                  setToggleMenuUser(true);
                }}
            >
              <FaUserCircle className="UserIcon" />
              <h4 className='Name-User-bar'>{dataUser.user.name}</h4>
              {toggleMenuUser && <DropdownUser close={close} toggleMenuUser={toggleMenuUser}/>}
            </div>
            )}
      </div>
    </div>
  );
};
export default NavbarReview;
